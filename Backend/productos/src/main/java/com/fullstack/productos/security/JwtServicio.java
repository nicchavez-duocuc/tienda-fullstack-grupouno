package com.fullstack.productos.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// Servicio que crea y lee los tokens JWT. En el token viajan el correo del
// usuario y su rol (ADMIN, VENDEDOR o COMPRADOR), así el filtro de seguridad
// puede autorizar cada petición sin volver a la base de datos
@Service
public class JwtServicio {

    @Value("${app.jwt.secreta}")
    private String secreta;

    @Value("${app.jwt.vigenteza}")
    private long vigentezaMilis;

    private SecretKey obtenerClave() {
        // La secreta es texto plano: la convertimos a una clave HMAC-SHA256
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(
                java.util.Base64.getEncoder().encodeToString(secreta.getBytes())));
    }

    // Crea el token para un usuario que ya inició sesión
    public String crearToken(String correo, String rol) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", rol);
        Date ahora = new Date();
        return Jwts.builder()
                .claims(claims)
                .subject(correo)
                .issuedAt(ahora)
                .expiration(new Date(ahora.getTime() + vigentezaMilis))
                .signWith(obtenerClave(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Lee el token y devuelve sus claims (lanza una excepción si es inválido o vencido)
    public Claims leerToken(String token) {
        return Jwts.parser().verifyWith(obtenerClave()).build().parseSignedClaims(token).getPayload();
    }
}
