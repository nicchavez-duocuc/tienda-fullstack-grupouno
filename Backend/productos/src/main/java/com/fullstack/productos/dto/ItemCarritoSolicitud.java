package com.fullstack.productos.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Datos para agregar/modificar un ítem del carrito: el producto por su código
// y la cantidad pedida
public record ItemCarritoSolicitud(
        @NotBlank String codigo,
        @NotNull @Min(1) Integer cantidad
) {}
