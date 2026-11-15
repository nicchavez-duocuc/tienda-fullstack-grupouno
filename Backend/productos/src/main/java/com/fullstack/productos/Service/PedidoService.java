package com.fullstack.productos.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.fullstack.productos.Repository.DetallePedidoRepository;
import com.fullstack.productos.Repository.PedidoRepository;
import com.fullstack.productos.Repository.ProductoRepository;
import com.fullstack.productos.model.DetallePedido;
import com.fullstack.productos.model.Pedido;
import com.fullstack.productos.model.Producto;
import com.fullstack.productos.model.Usuario;

// Maneja el carrito (pedido PENDIENTE del usuario) y los pedidos (compras)
@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // ---------- CARRITO (el pedido PENDIENTE del usuario) ----------

    // Devuelve el carrito del usuario. Si no tiene uno (o ya compró), crea uno nuevo
    @Transactional
    public Pedido obtenerCarrito(Usuario usuario) {
        Pedido carrito = pedidoRepository.findFirstByUsuarioIdAndEstadoOrderByIdAsc(usuario.getId(), Pedido.PENDIENTE)
                .orElseGet(() -> crearCarrito(usuario));
        // Un carrito recién creado en ESTE pedido aún no trae lista de detalles
        // (queda null en memoria); sin esto agregar/vaciar explota con NPE
        if (carrito.getDetalles() == null) {
            carrito.setDetalles(new ArrayList<>());
        }
        return carrito;
    }

    // Crea el carrito a prueba de carreras: si dos peticiones llegan al mismo
    // tiempo (doble clic en "Añadir al carrito", doble carga de la página),
    // ambas intentan insertar un pedido PENDIENTE. El índice único de la
    // migración V4 (un carrito PENDIENTE por usuario) hace fallar la segunda
    // inserción; en ese caso se vuelve a leer el carrito que la otra petición
    // creó, en lugar de explotar con un error 500.
    private Pedido crearCarrito(Usuario usuario) {
        Pedido nuevo = new Pedido();
        nuevo.setUsuario(usuario);
        nuevo.setEstado(Pedido.PENDIENTE);
        nuevo.setFecha(LocalDateTime.now());
        nuevo.setTotal(0L);

        try {
            // saveAndFlush: obliga a que la BD valide el índice único AHORA,
            // dentro del try (save() solo escribiría al final de la transacción)
            return pedidoRepository.saveAndFlush(nuevo);
        } catch (DataIntegrityViolationException yaExiste) {
            return pedidoRepository
                    .findFirstByUsuarioIdAndEstadoOrderByIdAsc(usuario.getId(), Pedido.PENDIENTE)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                            "No se pudo crear el carrito de compras."));
        }
    }

    // Agrega un producto (o suma cantidad si ya estaba), revisando el stock
    @Transactional
    public Pedido agregarItem(Usuario usuario, String codigo, Integer cantidad) {
        Producto producto = productoRepository.findByCodigoConCategoria(codigo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el producto " + codigo));

        if (producto.getStock() <= 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El producto no tiene stock disponible.");
        }

        Pedido carrito = obtenerCarrito(usuario);
        DetallePedido detalle = carrito.getDetalles() == null ? null : carrito.getDetalles().stream()
                .filter(d -> d.getProducto().getCodigo().equals(codigo))
                .findFirst().orElse(null);

        if (detalle == null) {
            detalle = new DetallePedido();
            detalle.setPedido(carrito);
            detalle.setProducto(producto);
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setCantidad(0);
            carrito.getDetalles().add(detalle);
        }

        int nuevaCantidad = detalle.getCantidad() + cantidad;
        if (nuevaCantidad > producto.getStock()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Solo quedan " + producto.getStock() + " unidades de " + producto.getNombre());
        }
        detalle.setCantidad(nuevaCantidad);

        return recalcularYGuardar(carrito);
    }

    // Cambia la cantidad de un ítem (o lo elimina si llegar a 0 o menos)
    @Transactional
    public Pedido modificarItem(Usuario usuario, String codigo, Integer cantidad) {
        if (cantidad <= 0) {
            return eliminarItem(usuario, codigo);
        }

        Pedido carrito = obtenerCarrito(usuario);
        DetallePedido detalle = encontrarDetalle(carrito, codigo);

        Producto producto = productoRepository.findByCodigoConCategoria(codigo).orElseThrow();
        if (cantidad > producto.getStock()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Solo quedan " + producto.getStock() + " unidades de " + producto.getNombre());
        }

        detalle.setCantidad(cantidad);
        return recalcularYGuardar(carrito);
    }

    // Saca un producto del carrito
    @Transactional
    public Pedido eliminarItem(Usuario usuario, String codigo) {
        Pedido carrito = obtenerCarrito(usuario);
        DetallePedido detalle = encontrarDetalle(carrito, codigo);
        carrito.getDetalles().remove(detalle);
        return recalcularYGuardar(carrito);
    }

    // Vacía el carrito completo
    @Transactional
    public Pedido vaciarCarrito(Usuario usuario) {
        Pedido carrito = obtenerCarrito(usuario);
        carrito.getDetalles().clear();
        return recalcularYGuardar(carrito);
    }

    // Finaliza la compra: PENDIENTE -> PAGADO, descuenta stock y devuelve el pedido
    @Transactional
    public Pedido finalizarCompra(Usuario usuario) {
        Pedido carrito = obtenerCarrito(usuario);
        if (carrito.getDetalles() == null || carrito.getDetalles().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El carrito está vacío.");
        }

        // Se bloquean los productos en orden de código para que dos compras
        // concurrentes tomen los locks en el mismo orden (evita deadlocks)
        List<DetallePedido> ordenados = new ArrayList<>(carrito.getDetalles());
        ordenados.sort((a, b) -> a.getProducto().getCodigo().compareTo(b.getProducto().getCodigo()));

        // Descuenta el stock de cada producto comprado. El findByCodigoConLock
        // toma un lock de escritura por fila: si otro usuario está comprando el
        // mismo producto al mismo tiempo, esta transacción espera y después lee
        // el stock real ya actualizado (ver ProductoRepository)
        for (DetallePedido detalle : ordenados) {
            Producto producto = productoRepository
                    .findByCodigoConLock(detalle.getProducto().getCodigo())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "El producto " + detalle.getProducto().getCodigo() + " ya no existe."));

            long quedan = producto.getStock() - detalle.getCantidad();
            if (quedan < 0) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,
                        "No hay stock suficiente de " + producto.getNombre());
            }
            producto.setStock(quedan);
            productoRepository.save(producto);
        }

        carrito.setEstado(Pedido.PAGADO);
        return pedidoRepository.save(carrito);
    }

    // ---------- PEDIDOS (para ADMIN y VENDEDOR) ----------

    // Todas las compras (no incluye carritos PENDIENTES)
    public List<Pedido> listarPedidos() {
        return pedidoRepository.listarComprasConUsuario();
    }

    // Un pedido con sus detalles (visualizar el detalle de la orden)
    public Pedido buscarPedidoConDetalles(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el pedido con id " + id));
        pedido.setDetalles(detallePedidoRepository.listarConProducto(id));
        return pedido;
    }

    // Detalles de un pedido (para /pedidos/{id}/detalle)
    public List<DetallePedido> listarDetalle(Long pedidoId) {
        buscarPedidoConDetalles(pedidoId); // valida que exista
        return detallePedidoRepository.listarConProducto(pedidoId);
    }

    // Pedidos (compras) de un usuario, para el historial del panel de ADMIN
    public List<Pedido> listarPedidosDeUsuario(Long usuarioId) {
        List<Pedido> pedidos = pedidoRepository.findAllByOrderByFechaDesc().stream()
                .filter(p -> p.getUsuario().getId().equals(usuarioId) && !p.getEstado().equals(Pedido.PENDIENTE))
                .toList();
        pedidos.forEach(p -> p.setDetalles(detallePedidoRepository.listarConProducto(p.getId())));
        return pedidos;
    }

    // ---------- Helper ----------

    private DetallePedido encontrarDetalle(Pedido carrito, String codigo) {
        return Optional.ofNullable(carrito.getDetalles()).orElse(List.of()).stream()
                .filter(d -> d.getProducto().getCodigo().equals(codigo))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "El producto " + codigo + " no está en tu carrito"));
    }

    private Pedido recalcularYGuardar(Pedido carrito) {
        long total = Optional.ofNullable(carrito.getDetalles()).orElse(List.of()).stream()
                .mapToLong(d -> d.getPrecioUnitario() * d.getCantidad())
                .sum();
        carrito.setTotal(total);
        return pedidoRepository.save(carrito);
    }
}
