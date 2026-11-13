package com.fullstack.productos.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fullstack.productos.Repository.CategoriaRepository;
import com.fullstack.productos.model.Categoria;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Lista de categorías (para la tienda y el panel)
    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    // Crear categoría (solo ADMIN). El nombre no se puede repetir
    public Categoria crearCategoria(Categoria categoria) {
        if (categoria.getNombre() == null || categoria.getNombre().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de la categoría es obligatorio.");
        }

        String nombre = categoria.getNombre().trim();
        if (categoriaRepository.existsByNombreIgnoreCase(nombre)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La categoría '" + nombre + "' ya existe.");
        }

        categoria.setNombre(nombre);
        categoria.setDescripcion(categoria.getDescripcion() == null ? "" : categoria.getDescripcion().trim());
        return categoriaRepository.save(categoria);
    }

    // Actualizar categoría (solo ADMIN)
    public Categoria actualizarCategoria(Long id, Categoria datos) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la categoría con id " + id));

        if (datos.getNombre() == null || datos.getNombre().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre de la categoría es obligatorio.");
        }

        String nombre = datos.getNombre().trim();
        categoriaRepository.findByNombreIgnoreCase(nombre)
                .filter(otra -> !otra.getId().equals(id))
                .ifPresent(otra -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "La categoría '" + nombre + "' ya existe.");
                });

        categoria.setNombre(nombre);
        categoria.setDescripcion(datos.getDescripcion() == null ? "" : datos.getDescripcion().trim());
        return categoriaRepository.save(categoria);
    }

    // Eliminar categoría (solo ADMIN). Falla con 409 si tiene productos
    public void eliminarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la categoría con id " + id));

        try {
            categoriaRepository.delete(categoria);
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar la categoría porque tiene productos asociados");
        }
    }
}
