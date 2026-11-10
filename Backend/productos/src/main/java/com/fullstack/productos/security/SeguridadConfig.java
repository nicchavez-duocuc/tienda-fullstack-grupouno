package com.fullstack.productos.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// Configuración de seguridad: JWT sin estado, CORS para el frontend de Vite
// y las reglas de acceso por rol:
//   ADMIN     -> todo
//   VENDEDOR  -> solo ver productos y pedidos (y sus detalles)
//   COMPRADOR -> solo la tienda: productos, categorías, reseñas, carrito
// Lo que no está permitido devuelve 403; lo que falta token devuelve 401
@Configuration
@EnableWebSecurity
public class SeguridadConfig {

    @Value("${app.frontend.url:http://localhost:5173}")
    private String urlFrontend;

    private final JwtFiltro jwtFiltro;

    public SeguridadConfig(JwtFiltro jwtFiltro) {
        this.jwtFiltro = jwtFiltro;
    }

    @Bean
    public PasswordEncoder codificadorClaves() {
        return new BCryptPasswordEncoder();
    }

    // CORS: permite que el frontend (Vite en 5173) hable con esta API
    @Bean
    public CorsConfigurationSource origenCors() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(urlFrontend));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource fuente = new UrlBasedCorsConfigurationSource();
        fuente.registerCorsConfiguration("/**", config);
        return fuente;
    }

    @Bean
    public SecurityFilterChain laCadena(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(origenCors()))
            .sessionManagement(sesion -> sesion.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(peticiones -> peticiones
                // Registro, login y documentación: abiertos
                .requestMatchers("/api/v1/auth/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                // La tienda se puede mirar sin iniciar sesión
                .requestMatchers(HttpMethod.GET, "/api/v1/productos/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/categorias/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/resenas/**").permitAll()
                // Manejo de productos y categorías: solo ADMIN
                .requestMatchers(HttpMethod.POST, "/api/v1/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/v1/productos/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/productos/**").hasRole("ADMIN")
                .requestMatchers("/api/v1/categorias/**").hasRole("ADMIN")
                // El usuario puede actualizar SU PROPIO perfil (apodo, avatar, clave)
                .requestMatchers(HttpMethod.PUT, "/api/v1/usuarios/me").authenticated()
                // Usuarios y dashboard: solo ADMIN
                .requestMatchers("/api/v1/usuarios/**", "/api/v1/dashboard").hasRole("ADMIN")
                // Reseñas: escribirlas o borrarlas = ADMIN o COMPRADOR
                .requestMatchers(HttpMethod.POST, "/api/v1/resenas/**").hasAnyRole("ADMIN", "COMPRADOR")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/resenas/**").hasAnyRole("ADMIN", "COMPRADOR")
                // Carrito (y finalizar compra): ADMIN o COMPRADOR
                .requestMatchers("/api/v1/carrito/**").hasAnyRole("ADMIN", "COMPRADOR")
                // Pedidos y sus detalles: ADMIN o VENDEDOR (solo lectura)
                .requestMatchers("/api/v1/pedidos/**").hasAnyRole("ADMIN", "VENDEDOR")
                // Cualquier otra ruta necesita sesión
                .anyRequest().authenticated()
            )
            // Sin token: 401 con mensaje claro
            .exceptionHandling(errores -> errores
                .authenticationEntryPoint((peticion, respuesta, error) -> {
                    respuesta.setStatus(HttpStatus.UNAUTHORIZED.value());
                    respuesta.setContentType("application/json");
                    respuesta.getWriter().write("{\"mensaje\":\"Debes iniciar sesión (token JWT ausente o inválido)\"}");
                })
                // Sin permiso: 403 con mensaje claro
                .accessDeniedHandler((peticion, respuesta, error) -> {
                    respuesta.setStatus(HttpStatus.FORBIDDEN.value());
                    respuesta.setContentType("application/json");
                    respuesta.getWriter().write("{\"mensaje\":\"Acceso denegado: tu rol no tiene permiso para esta acción\"}");
                })
            )
            // El filtro JWT va antes del filtro estándar para llenar el contexto de seguridad
            .addFilterBefore(jwtFiltro, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
