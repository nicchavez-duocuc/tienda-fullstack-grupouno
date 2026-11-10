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

import com.fullstack.productos.Service.CategoriaService;
import com.fullstack.productos.model.Categoria;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// GET público (la tienda lee las categorías); crear/cambiar/borrar solo ADMIN
@Tag(name = "Categorias", description = "Categorías del catálogo: lectura pública, CRUD solo ADMIN")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @Operation(summary = "Listar todas las categorías (público)")
    @GetMapping
    public List<Categoria> listar() {
        return categoriaService.listarCategorias();
    }

    @Operation(summary = "Crear una categoría (ADMIN)")
    @PostMapping
    public ResponseEntity<Categoria> crear(@RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.crearCategoria(categoria));
    }

    @Operation(summary = "Actualizar una categoría (ADMIN)")
    @PutMapping("/{id}")
    public Categoria actualizar(@PathVariable Long id, @RequestBody Categoria datos) {
        return categoriaService.actualizarCategoria(id, datos);
    }

    @Operation(summary = "Eliminar una categoría (ADMIN)", description = "Devuelve 409 si la categoría tiene productos asociados")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
