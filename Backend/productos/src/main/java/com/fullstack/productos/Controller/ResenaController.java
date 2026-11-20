package com.fullstack.productos.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Service.AuthService;
import com.fullstack.productos.Service.ResenaService;
import com.fullstack.productos.dto.ResenaRespuesta;
import com.fullstack.productos.dto.ResenaSolicitud;
import com.fullstack.productos.model.Usuario;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// Reseñas con autoría: leer es público; escribir/borrar es de ADMIN y
// COMPRADOR (una reseña por usuario y producto)
@Tag(name = "Resenas", description = "Reseñas de productos con autoría del usuario")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/resenas")
public class ResenaController {

    private final ResenaService resenaService;
    private final AuthService authService;

    public ResenaController(ResenaService resenaService, AuthService authService) {
        this.resenaService = resenaService;
        this.authService = authService;
    }

    @Operation(summary = "Listar reseñas (público)", description = "Con ?producto=P001 filtra por producto.")
    @GetMapping
    public List<ResenaRespuesta> listar(@RequestParam(required = false) String producto) {
        return resenaService.listar(producto);
    }

    @Operation(summary = "Escribir una reseña (ADMIN/COMPRADOR)", description = "El autor es el usuario del token y la fecha la pone el servidor. Máx. 1 reseña por producto")
    @PostMapping
    public ResponseEntity<ResenaRespuesta> escribir(Authentication autenticacion,
            @Valid @RequestBody ResenaSolicitud datos) {
        Usuario usuario = authService.entidadActual(autenticacion);
        ResenaRespuesta nueva = resenaService.escribir(usuario, datos.producto(), datos.puntuacion(), datos.comentario());
        return ResponseEntity.ok(nueva);
    }

    @Operation(summary = "Borrar una reseña (autor o ADMIN)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(Authentication autenticacion, @PathVariable Long id) {
        Usuario usuario = authService.entidadActual(autenticacion);
        resenaService.eliminar(usuario, id);
        return ResponseEntity.noContent().build();
    }
}
