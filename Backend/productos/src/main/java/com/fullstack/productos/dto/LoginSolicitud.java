package com.fullstack.productos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Datos que manda el formulario de inicio de sesión
public record LoginSolicitud(
        @NotBlank @Email String correo,
        @NotBlank String clave
) {}
