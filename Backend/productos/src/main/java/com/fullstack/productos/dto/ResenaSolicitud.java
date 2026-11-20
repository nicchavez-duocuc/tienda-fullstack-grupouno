package com.fullstack.productos.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Datos para escribir una reseña: a qué producto (código), la puntuación 1-5
// y el comentario. El autor es el usuario del token; la fecha la pone el servidor
public record ResenaSolicitud(
        @NotBlank String producto,
        @NotNull @Min(1) @Max(5) Integer puntuacion,
        @NotBlank String comentario
) {}
