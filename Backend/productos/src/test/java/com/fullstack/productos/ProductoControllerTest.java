package com.fullstack.productos;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;

import com.fullstack.productos.model.Categoria;

/** Validaciones de negocio del catalogo (crear, actualizar, estado y borrar). */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductoControllerTest extends BaseIntegracionTest {

    private String tokenAdmin;
    private Categoria categoria;

    @BeforeEach
    void prepararEscenario() throws Exception {
        crearUsuario("admin@test.com", "ADMIN", "Clave123.");
        tokenAdmin = token("admin@test.com", "Clave123.");
        categoria = crearCategoria("Teclados");
    }

    private String productoJson(String codigo, String nombre, String nombreCategoria) {
        // "estado" se explicita porque el esquema H2 generado por JPA no tiene
        // el DEFAULT 'DISPONIBLE' que si tiene la migracion V5 de MySQL.
        return """
                {"codigo":"%s","nombre":"%s","precio":15000,"stock":4,
                 "imagen":"img.png","descripcion":"prueba","estado":"DISPONIBLE",
                 "categoria":{"nombre":"%s"}}
                """.formatted(codigo, nombre, nombreCategoria);
    }

    @Test
    void crearProductoConCategoriaValidaDevuelve201() throws Exception {
        mockMvc.perform(post("/api/v1/productos")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productoJson("P100", "Teclado RGB", "Teclados")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.codigo").value("P100"))
                .andExpect(jsonPath("$.estado").value("DISPONIBLE"))
                .andExpect(jsonPath("$.categoria.nombre").value("Teclados"));
    }

    @Test
    void crearProductoConCodigoRepetidoDevuelve409() throws Exception {
        crearProducto("P100", 15000, 4, categoria, 1);

        mockMvc.perform(post("/api/v1/productos")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productoJson("P100", "Otro teclado", "Teclados")))
                .andExpect(status().isConflict());
    }

    @Test
    void crearProductoConCategoriaInexistenteDevuelve400() throws Exception {
        mockMvc.perform(post("/api/v1/productos")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productoJson("P101", "Mouse", "Categoria Fantasma")))
                .andExpect(status().isBadRequest());
    }

    @Test
    void actualizarProductoModificaLosDatos() throws Exception {
        crearProducto("P100", 15000, 4, categoria, 1);

        mockMvc.perform(put("/api/v1/productos/P100")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productoJson("P100", "Teclado Actualizado", "Teclados")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Teclado Actualizado"))
                .andExpect(jsonPath("$.precio").value(15000));
    }

    @Test
    void actualizarProductoConNombreVacioDevuelve400() throws Exception {
        crearProducto("P100", 15000, 4, categoria, 1);

        mockMvc.perform(put("/api/v1/productos/P100")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productoJson("P100", "", "Teclados")))
                .andExpect(status().isBadRequest());
    }

    @Test
    void cambiarEstadoSoloLoPuedeHacerElVendedorDelProducto() throws Exception {
        crearProducto("P100", 15000, 4, categoria, 7);

        mockMvc.perform(put("/api/v1/productos/P100/estado")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .param("idVendedor", "99")
                        .param("estado", "AGOTADO"))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/v1/productos/P100/estado")
                        .header("Authorization", "Bearer " + tokenAdmin)
                        .param("idVendedor", "7")
                        .param("estado", "AGOTADO"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("AGOTADO"));
    }

    @Test
    void buscarProductoInexistenteDevuelve404() throws Exception {
        mockMvc.perform(get("/api/v1/productos/NOEXISTE"))
                .andExpect(status().isNotFound());
    }

    @Test
    void eliminarProductoInexistenteDevuelve404() throws Exception {
        mockMvc.perform(delete("/api/v1/productos/NOEXISTE")
                        .header("Authorization", "Bearer " + tokenAdmin))
                .andExpect(status().isNotFound());
    }
}
