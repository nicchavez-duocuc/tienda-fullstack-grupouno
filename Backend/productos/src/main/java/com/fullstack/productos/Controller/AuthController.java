package com.fullstack.productos.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Service.AuthService;
import com.fullstack.productos.dto.LoginSolicitud;
import com.fullstack.productos.dto.RegistroSolicitud;
import com.fullstack.productos.dto.SesionRespuesta;
import com.fullstack.productos.dto.UsuarioRespuesta;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

// Registro, login y sesión actual. Abiertos (no piden token, excepto /me)
@Tag(name = "Auth", description = "Registro, inicio de sesión y sesión actual")
@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Crear cuenta (queda como COMPRADOR)
    @Operation(summary = "Registrar un usuario nuevo (rol COMPRADOR)")
    @PostMapping("/registrar")
    public ResponseEntity<UsuarioRespuesta> registrar(@Valid @RequestBody RegistroSolicitud datos) {
        UsuarioRespuesta nuevo = authService.registrar(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // Correo + clave -> JWT + datos del usuario
    @Operation(summary = "Iniciar sesión: devuelve el token JWT y los datos del usuario")
    @PostMapping("/login")
    public ResponseEntity<SesionRespuesta> login(@Valid @RequestBody LoginSolicitud datos) {
        return ResponseEntity.ok(authService.iniciarSesion(datos));
    }

    // Datos del dueño del token (rol y demás)
    @Operation(summary = "Datos del usuario con sesión activa")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/me")
    public ResponseEntity<UsuarioRespuesta> yo(Authentication autenticacion) {
        return ResponseEntity.ok(authService.usuarioActual(autenticacion));
    }
}
