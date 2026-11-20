package com.fullstack.productos;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;

/** Reglas de acceso por rol (JWT) configuradas en SeguridadConfig. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SeguridadTest extends BaseIntegracionTest {

    private String tokenAdmin;
    private String tokenVendedor;
    private String tokenComprador;

    @BeforeEach
    void prepararUsuarios() throws Exception {
        crearUsuario("admin@test.com", "ADMIN", "Clave123.");
        crearUsuario("vendedor@test.com", "VENDEDOR", "Clave123.");
        crearUsuario("comprador@test.com", "COMPRADOR", "Clave123.");

        tokenAdmin = token("admin@test.com", "Clave123.");
        tokenVendedor = token("vendedor@test.com", "Clave123.");
        tokenComprador = token("comprador@test.com", "Clave123.");
    }

    @Test
    void elCatalogoSePuedeVerSinToken() throws Exception {
        crearCategoria("Teclados");

        mockMvc.perform(get("/api/v1/productos"))
                .andExpect(status().isOk());
    }

    @Test
    void listarUsuariosSinTokenDevuelve401() throws Exception {
        mockMvc.perform(get("/api/v1/usuarios"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void compradorNoPuedeListarUsuariosPeroAdminSi() throws Exception {
        mockMvc.perform(get("/api/v1/usuarios")
                        .header("Authorization", "Bearer " + tokenComprador))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/v1/usuarios")
                        .header("Authorization", "Bearer " + tokenAdmin))
                .andExpect(status().isOk());
    }

    @Test
    void vendedorPuedeVerPedidosPeroCompradorNo() throws Exception {
        mockMvc.perform(get("/api/v1/pedidos")
                        .header("Authorization", "Bearer " + tokenVendedor))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/v1/pedidos")
                        .header("Authorization", "Bearer " + tokenComprador))
                .andExpect(status().isForbidden());
    }

    @Test
    void vendedorPuedeCrearProductoPeroCompradorNo() throws Exception {
        crearCategoria("Teclados");
        String producto = """
                {"codigo":"P900","nombre":"Teclado","precio":10000,"stock":3,
                 "imagen":"img.png","descripcion":"prueba","estado":"DISPONIBLE",
                 "categoria":{"nombre":"Teclados"}}
                """;

        mockMvc.perform(post("/api/v1/productos")
                        .header("Authorization", "Bearer " + tokenVendedor)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(producto))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/v1/productos")
                        .header("Authorization", "Bearer " + tokenComprador)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(producto.replace("P900", "P901")))
                .andExpect(status().isForbidden());
    }

    @Test
    void soloAdminPuedeEliminarProductos() throws Exception {
        crearCategoria("Teclados");
        crearProducto("P900", 10000, 3, categoriaRepository.findAll().get(0), 1);

        mockMvc.perform(delete("/api/v1/productos/P900")
                        .header("Authorization", "Bearer " + tokenVendedor))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/v1/productos/P900")
                        .header("Authorization", "Bearer " + tokenAdmin))
                .andExpect(status().isNoContent());
    }

    @Test
    void vendedorNoPuedeUsarElCarrito() throws Exception {
        mockMvc.perform(get("/api/v1/carrito")
                        .header("Authorization", "Bearer " + tokenVendedor))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/v1/carrito")
                        .header("Authorization", "Bearer " + tokenComprador))
                .andExpect(status().isOk());
    }
}
