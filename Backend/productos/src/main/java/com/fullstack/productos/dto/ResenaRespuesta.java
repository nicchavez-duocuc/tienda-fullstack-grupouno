package com.fullstack.productos.dto;

// La reseña tal como la muestra la página de la tienda (misma forma que antes):
// "producto" = nombre del producto, "nombre" = apodo del autor, "fecha" dd/mm/yyyy
public record ResenaRespuesta(
        Long id,
        String producto,
        String nombre,
        Integer puntuacion,
        String comentario,
        String fecha
) {}
