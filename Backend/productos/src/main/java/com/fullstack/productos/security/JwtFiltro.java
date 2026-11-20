package com.fullstack.productos.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// Filtro que revisa el encabezado "Authorization: Bearer <token>" en cada
// petición. Si el token es válido, deja como usuario autenticado al dueño del
// token con su rol (ROLE_ADMIN, ROLE_VENDEDOR, ROLE_COMPRADOR)
@Component
public class JwtFiltro extends OncePerRequestFilter {

    private final JwtServicio jwtServicio;

    public JwtFiltro(JwtServicio jwtServicio) {
        this.jwtServicio = jwtServicio;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filtro)
            throws ServletException, IOException {

        String encabezado = request.getHeader("Authorization");

        if (encabezado != null && encabezado.startsWith("Bearer ")) {
            String token = encabezado.substring(7);
            try {
                Claims claims = jwtServicio.leerToken(token);
                String correo = claims.getSubject();
                String rol = String.valueOf(claims.get("rol"));

                // El nombre del rol va con el prefijo "ROLE_" para hasRole(...)
                var autenticacion = new UsernamePasswordAuthenticationToken(
                        correo, null, List.of(new SimpleGrantedAuthority("ROLE_" + rol)));
                autenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(autenticacion);
            } catch (Exception e) {
                // Token inválido o vencido: no se autentica (y la cadena devuelve 401)
                SecurityContextHolder.clearContext();
            }
        }

        filtro.doFilter(request, response);
    }

    // Sin esto, cuando el servidor lanza un error (405/500) el filtro NO se
    // vuelve a aplicar en el "error dispatch" y al usuario con sesión válida
    // le aparece un 401 falso ("Debes iniciar sesión"). Filtrando también ahí,
    // recibe el error real del servidor
    @Override
    protected boolean shouldNotFilterErrorDispatch() {
        return false;
    }
}
