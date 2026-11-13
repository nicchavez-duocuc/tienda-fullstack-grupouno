package com.fullstack.productos.dto;

// Respuesta del login: el JWT para el header Authorization + los datos del usuario
public record SesionRespuesta(String token, UsuarioRespuesta usuario) {}
