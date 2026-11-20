package com.fullstack.productos.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Service.AuthService;
import com.fullstack.productos.Service.PedidoService;
import com.fullstack.productos.dto.ItemCarritoSolicitud;
import com.fullstack.productos.model.Pedido;
import com.fullstack.productos.model.Usuario;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// Carrito del usuario = su pedido con estado PENDIENTE. ADMIN y COMPRADOR
// tienen acceso; VENDEDOR no (eso devuelve 403)
@Tag(name = "Carrito", description = "Carrito de compras del usuario (pedido PENDIENTE en la BD)")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/carrito")
public class CarritoController {

    private final PedidoService pedidoService;
    private final AuthService authService;

    public CarritoController(PedidoService pedidoService, AuthService authService) {
        this.pedidoService = pedidoService;
        this.authService = authService;
    }

    private Usuario yo(Authentication autenticacion) {
        return authService.entidadActual(autenticacion);
    }

    @Operation(summary = "Ver mi carrito (lo crea si no existe)")
    @GetMapping
    public Pedido verCarrito(Authentication autenticacion) {
        Usuario usuario = yo(autenticacion);
        Pedido carrito = pedidoService.obtenerCarrito(usuario);
        // Los detalles vienen con el @OneToMany; se rellenan por consistencia
        carrito.setDetalles(pedidoService.listarDetalle(carrito.getId()));
        return carrito;
    }

    @Operation(summary = "Agregar un producto al carrito (o sumar su cantidad)")
    @PostMapping("/items")
    public Pedido agregarProducto(Authentication autenticacion, @Valid @RequestBody ItemCarritoSolicitud item) {
        Usuario usuario = yo(autenticacion);
        Pedido carrito = pedidoService.agregarItem(usuario, item.codigo(), item.cantidad());
        carrito.setDetalles(pedidoService.listarDetalle(carrito.getId()));
        return carrito;
    }

    @Operation(summary = "Cambiar la cantidad de un ítem (0 o menos lo elimina)")
    @PutMapping("/items/{codigo}")
    public Pedido modificarCantidad(Authentication autenticacion, @PathVariable String codigo,
            @RequestBody ItemCarritoSolicitud item) {
        Usuario usuario = yo(autenticacion);
        Pedido carrito = pedidoService.modificarItem(usuario, codigo, item.cantidad());
        carrito.setDetalles(pedidoService.listarDetalle(carrito.getId()));
        return carrito;
    }

    @Operation(summary = "Eliminar un producto del carrito")
    @DeleteMapping("/items/{codigo}")
    public Pedido eliminarProducto(Authentication autenticacion, @PathVariable String codigo) {
        Usuario usuario = yo(autenticacion);
        Pedido carrito = pedidoService.eliminarItem(usuario, codigo);
        carrito.setDetalles(pedidoService.listarDetalle(carrito.getId()));
        return carrito;
    }

    @Operation(summary = "Vaciar el carrito completo")
    @DeleteMapping
    public Pedido vaciar(Authentication autenticacion) {
        Usuario usuario = yo(autenticacion);
        Pedido carrito = pedidoService.vaciarCarrito(usuario);
        carrito.setDetalles(pedidoService.listarDetalle(carrito.getId()));
        return carrito;
    }

    @Operation(summary = "Finalizar la compra", description = "El pedido PENDIENTE pasa a PAGADO y se descuenta el stock. La próxima vez se crea un carrito nuevo")
    @PostMapping("/finalizar")
    public ResponseEntity<Pedido> finalizarCompra(Authentication autenticacion) {
        Usuario usuario = yo(autenticacion);
        Pedido pagado = pedidoService.finalizarCompra(usuario);
        pagado.setDetalles(pedidoService.listarDetalle(pagado.getId()));
        return ResponseEntity.ok(pagado);
    }
}
