package com.fullstack.productos.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Service.PedidoService;
import com.fullstack.productos.model.DetallePedido;
import com.fullstack.productos.model.Pedido;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

// Pedidos (compras finalizadas) con sus detalles. Solo ADMIN y VENDEDOR
@Tag(name = "Pedidos", description = "Pedidos y sus detalles (solo ADMIN y VENDEDOR)")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @Operation(summary = "Listar todos los pedidos (compras)")
    @GetMapping
    public List<Pedido> listar() {
        return pedidoService.listarPedidos();
    }

    @Operation(summary = "Ver un pedido con sus detalles")
    @GetMapping("/{id}")
    public Pedido buscar(@PathVariable Long id) {
        return pedidoService.buscarPedidoConDetalles(id);
    }

    @Operation(summary = "Ver el detalle de una orden", description = "Los productos y cantidades que forman el pedido")
    @GetMapping("/{id}/detalle")
    public List<DetallePedido> detalle(@PathVariable Long id) {
        return pedidoService.listarDetalle(id);
    }
}
