package com.fullstack.productos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import com.fullstack.productos.security.JwtServicio;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;

/** Prueba unitaria del servicio de tokens (sin Spring ni base de datos). */
class JwtServicioTest {

    private JwtServicio servicio;

    @BeforeEach
    void preparar() {
        servicio = new JwtServicio();
        ReflectionTestUtils.setField(servicio, "secreta",
                "CLAVE-DE-PRUEBA-SOLO-TEST-NIVELUP-GAMER-2026-1234567890");
        ReflectionTestUtils.setField(servicio, "vigentezaMilis", 3_600_000L);
    }

    @Test
    void elTokenContieneElCorreoElRolYFechasDeValidez() {
        String token = servicio.crearToken("admin@test.com", "ADMIN");

        Claims claims = servicio.leerToken(token);
        assertEquals("admin@test.com", claims.getSubject());
        assertEquals("ADMIN", claims.get("rol"));
        assertNotNull(claims.getIssuedAt());
        assertNotNull(claims.getExpiration());
    }

    @Test
    void unTokenManipuladoEsRechazado() {
        String token = servicio.crearToken("admin@test.com", "ADMIN") + "x";

        assertThrows(JwtException.class, () -> servicio.leerToken(token));
    }

    @Test
    void unTokenVencidoEsRechazado() {
        ReflectionTestUtils.setField(servicio, "vigentezaMilis", -1000L);
        String token = servicio.crearToken("admin@test.com", "ADMIN");

        assertThrows(ExpiredJwtException.class, () -> servicio.leerToken(token));
    }
}
