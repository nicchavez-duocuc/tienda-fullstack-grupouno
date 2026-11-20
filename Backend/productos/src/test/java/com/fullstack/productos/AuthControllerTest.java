package com.fullstack.productos;

import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;

/** Registro, login y sesion actual (/api/v1/auth). */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest extends BaseIntegracionTest {

    private static final String REGISTRO = """
            {"nombre":"Ana","apellido":"Perez","fecha":"2000-05-15",
             "correo":"ana@test.com","clave":"Clave123."}
            """;

    private String registrar(String json) throws Exception {
        return mockMvc.perform(post("/api/v1/auth/registrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andReturn().getResponse().getContentAsString();
    }

    @Test
    void registrarCreaUsuarioComoCompradorYNuncaDevuelveLaClave() throws Exception {
        mockMvc.perform(post("/api/v1/auth/registrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(REGISTRO))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.nombre").value("Ana"))
                .andExpect(jsonPath("$.apodo").value("Ana"))
                .andExpect(jsonPath("$.correo").value("ana@test.com"))
                .andExpect(jsonPath("$.rol").value("COMPRADOR"))
                .andExpect(jsonPath("$.clave").doesNotExist());
    }

    @Test
    void registrarCorreoRepetidoDevuelveConflicto() throws Exception {
        registrar(REGISTRO);

        mockMvc.perform(post("/api/v1/auth/registrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(REGISTRO))
                .andExpect(status().isConflict());
    }

    @Test
    void registrarConCorreoInvalidoDevuelve400() throws Exception {
        String json = REGISTRO.replace("ana@test.com", "correo-no-valido");

        mockMvc.perform(post("/api/v1/auth/registrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registrarConFechaInvalidaDevuelve400() throws Exception {
        String json = REGISTRO.replace("2000-05-15", "15-05-2000");

        mockMvc.perform(post("/api/v1/auth/registrar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    void loginCorrectoDevuelveTokenYDatosDelUsuario() throws Exception {
        registrar(REGISTRO);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"correo\":\"ana@test.com\",\"clave\":\"Clave123.\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.token", not("")))
                .andExpect(jsonPath("$.usuario.correo").value("ana@test.com"))
                .andExpect(jsonPath("$.usuario.rol").value("COMPRADOR"))
                .andExpect(jsonPath("$.usuario.clave").doesNotExist());
    }

    @Test
    void loginConClaveIncorrectaDevuelve401() throws Exception {
        registrar(REGISTRO);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"correo\":\"ana@test.com\",\"clave\":\"clave-malita\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void loginConCorreoInexistenteDevuelve401() throws Exception {
        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"correo\":\"nadie@test.com\",\"clave\":\"Clave123.\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void meSinTokenDevuelve401() throws Exception {
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void meConTokenValidoDevuelveElUsuarioDeLaSesion() throws Exception {
        registrar(REGISTRO);
        String token = token("ana@test.com", "Clave123.");

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correo").value("ana@test.com"))
                .andExpect(jsonPath("$.rol").value("COMPRADOR"));
    }

    @Test
    void meConTokenInvalidoDevuelve401() throws Exception {
        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer token-falso"))
                .andExpect(status().isUnauthorized());
    }
}
