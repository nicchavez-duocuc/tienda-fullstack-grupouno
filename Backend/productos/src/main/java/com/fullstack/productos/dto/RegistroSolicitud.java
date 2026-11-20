package com.fullstack.productos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Datos que manda el formulario de registro. Igual que el frontend:
// fecha = fecha de nacimiento (aaaa-mm-dd)
public record RegistroSolicitud(
        @NotBlank String nombre,
        @NotBlank String apellido,
        @NotNull String fecha,
        @NotBlank @Email String correo,
        @NotBlank String clave
) {}
