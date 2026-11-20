package com.fullstack.productos.dto;

// El usuario sin la clave (misma forma que "usuarioActivo" del frontend).
// Se usa en /auth/login y /auth/me
public record UsuarioRespuesta(
        Long id,
        String nombre,
        String apodo,
        String correo,
        String avatar,
        String rol
) {}
