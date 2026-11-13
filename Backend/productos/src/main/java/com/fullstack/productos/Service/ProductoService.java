package com.fullstack.productos.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fullstack.productos.Repository.ProductoRepository;
import com.fullstack.productos.model.Categoria;
import com.fullstack.productos.model.Producto;
import com.fullstack.productos.Repository.CategoriaRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Lista completa de la tienda (con la categoría de cada producto)
    public List<Producto> listarProductos() {
        return productoRepository.listarConCategoria();
    }

    // Guardar (solo ADMIN). La categoría llega con su nombre (o id) desde el panel
    public Optional<Producto> guardarProducto(Producto producto) {
        try {
            Optional<Producto> existe = productoRepository.findByCodigo(producto.getCodigo());

            if (existe.isPresent()) {
                return Optional.empty(); // código repetido
            }

            // La FK de categoria debe apuntar a una categoría que ya existe
            producto.setCategoria(resolverCategoria(producto.getCategoria()));

            return Optional.of(productoRepository.save(producto));

        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Error inesperado al guardar el producto: " + e.getMessage());
            throw new RuntimeException("Error inesperado en el servidor");
        }
    }

    // Buscar por codigo
    public Optional<Producto> buscarPorCodigo(String codigo) {
        return productoRepository.findByCodigoConCategoria(codigo);
    }

    // Actualizar (solo ADMIN)
    public Producto actualizarProducto(String codigo, Producto datosNuevos) {

        if (datosNuevos == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Los datos no pueden ser nulos.");
        }
        if (datosNuevos.getNombre() == null || datosNuevos.getNombre().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio.");
        }
        if (datosNuevos.getPrecio() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio es obligatorio.");
        }
        if (datosNuevos.getStock() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El stock es obligatorio.");
        }
        if (datosNuevos.getCategoria() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La categoría es obligatoria.");
        }
        if (datosNuevos.getImagen() == null || datosNuevos.getImagen().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La imagen es obligatoria.");
        }

        try {
            Producto productoEnBD = productoRepository.findByCodigo(codigo).orElse(null);

            if (productoEnBD != null) {
                productoEnBD.setNombre(datosNuevos.getNombre());
                productoEnBD.setPrecio(datosNuevos.getPrecio());
                productoEnBD.setStock(datosNuevos.getStock());
                productoEnBD.setCategoria(resolverCategoria(datosNuevos.getCategoria()));
                productoEnBD.setImagen(datosNuevos.getImagen());
                productoEnBD.setDescripcion(datosNuevos.getDescripcion());

                return productoRepository.save(productoEnBD);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe un producto con el código " + codigo);
            }
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Error al actualizar el producto: " + e.getMessage());
            throw new RuntimeException("Error interno al actualizar los datos");
        }
    }

    // Eliminar por codigo (solo ADMIN). Falla con 409 si el producto está en pedidos
    public boolean eliminarProductoPorCodigo(String codigo) {
        try {
            Producto productoExistente = productoRepository.findByCodigo(codigo).orElse(null);

            if (productoExistente != null) {
                productoRepository.delete(productoExistente);
                return true;
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe un producto con el código " + codigo);
            }
        } catch (ResponseStatusException e) {
            throw e;
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar el producto porque está en pedidos o reseñas");
        }
    }

    // Si llega una categoría con nombre, busca esa categoría en la BD.
    // Si no existe (o no llega), error 400
    private Categoria resolverCategoria(Categoria categoria) {
        if (categoria == null || categoria.getNombre() == null || categoria.getNombre().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La categoría es obligatoria.");
        }
        return categoriaRepository.findByNombreIgnoreCase(categoria.getNombre().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "La categoría '" + categoria.getNombre() + "' no existe. Créala primero en el panel de categorías."));
    }
}
