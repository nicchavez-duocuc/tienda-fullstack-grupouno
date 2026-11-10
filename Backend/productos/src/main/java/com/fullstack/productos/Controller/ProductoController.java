package com.fullstack.productos.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Service.ProductoService;
import com.fullstack.productos.model.Producto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// GET público (la tienda lee el catálogo); crear/cambiar/borrar solo ADMIN.
// La categoría viaja como {"categoria": {"nombre": "..."}} y el servicio la
// valida contra la tabla categoria
@Tag(name = "Productos", description = "Catálogo de productos: lectura pública, CRUD solo ADMIN")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @Operation(summary = "Listar todos los productos (público)")
    @GetMapping
    public List<Producto> listar() {
        return productoService.listarProductos();
    }

    @Operation(summary = "Buscar producto por código (público)")
    @GetMapping("/{codigo}")
    public ResponseEntity<Producto> buscar(@PathVariable String codigo) {
        return productoService.buscarPorCodigo(codigo)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear producto (ADMIN)", description = "400 si el código ya existe o la categoría no existe")
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        return productoService.guardarProducto(producto)
                .map(p -> ResponseEntity.status(HttpStatus.CREATED).body(p))
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        HttpStatus.CONFLICT, "El código " + producto.getCodigo() + " ya existe."));
    }

    @Operation(summary = "Actualizar producto por código (ADMIN)")
    @PutMapping("/{codigo}")
    public Producto actualizar(@PathVariable String codigo, @RequestBody Producto datos) {
        return productoService.actualizarProducto(codigo, datos);
    }

    @Operation(summary = "Eliminar producto por código (ADMIN)", description = "Devuelve 409 si el producto está en pedidos o reseñas")
    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> eliminar(@PathVariable String codigo) {
        productoService.eliminarProductoPorCodigo(codigo);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
