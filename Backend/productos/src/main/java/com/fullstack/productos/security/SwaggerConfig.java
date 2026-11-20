package com.fullstack.productos.security;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Documentación de la API con Swagger (springdoc). Con "bearerAuth" aparece
// el botón "Authorize" en /swagger-ui.html para pegar el JWT y probar los
// endpoints protegidos
@Configuration
@OpenAPIDefinition(info = @Info(
        title = "API LEVEL-UP GAMER",
        version = "1.0",
        description = "API REST de la tienda LEVEL-UP GAMER. Endpoints /api/v1/** "
                + "protegidos con JWT. Roles: ADMIN (acceso total), VENDEDOR (ver productos y pedidos), "
                + "COMPRADOR (usar la tienda). Acciones no permitidas devuelven 403."
))
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class SwaggerConfig {

    @Bean
    public OpenAPI conSwagger() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearerAuth",
                        new io.swagger.v3.oas.models.security.SecurityScheme()
                                .type(io.swagger.v3.oas.models.security.SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
