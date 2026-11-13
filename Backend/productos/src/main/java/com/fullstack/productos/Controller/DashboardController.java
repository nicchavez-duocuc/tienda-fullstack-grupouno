package com.fullstack.productos.Controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Repository.CategoriaRepository;
import com.fullstack.productos.Repository.PedidoRepository;
import com.fullstack.productos.Repository.ProductoRepository;
import com.fullstack.productos.Repository.UsuarioRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

// Métricas del dashboard: conteos de producto, categoria, usuario y pedido.
// La cadena de seguridad exige ADMIN para esta ruta
@Tag(name = "Dashboard", description = "Métricas resumen (solo ADMIN)")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PedidoRepository pedidoRepository;

    public DashboardController(ProductoRepository productoRepository, CategoriaRepository categoriaRepository,
            UsuarioRepository usuarioRepository, PedidoRepository pedidoRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @Operation(summary = "Conteos del sistema (ADMIN)")
    @GetMapping
    public Map<String, Long> metricas() {
        Map<String, Long> metricas = new LinkedHashMap<>();
        metricas.put("productos", productoRepository.count());
        metricas.put("categorias", categoriaRepository.count());
        metricas.put("usuarios", usuarioRepository.count());
        metricas.put("pedidos", pedidoRepository.count());
        return metricas;
    }
}
