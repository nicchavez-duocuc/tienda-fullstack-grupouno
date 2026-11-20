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
import com.fullstack.productos.model.Producto;

/** Flujo completo del carrito: agregar, modificar, vaciar y finalizar compra. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CarritoIntegracionTest extends BaseIntegracionTest {

    private String token;
    private Categoria categoria;
    private Producto producto;

    @BeforeEach
    void prepararEscenario() throws Exception {
        crearUsuario("comprador@test.com", "COMPRADOR", "Clave123.");
        token = token("comprador@test.com", "Clave123.");
        categoria = crearCategoria("Teclados");
        producto = crearProducto("P001", 10000, 5, categoria, 1);
    }

    private String agregar(String codigo, int cantidad) throws Exception {
        String item = "{\"codigo\":\"" + codigo + "\",\"cantidad\":" + cantidad + "}";
        return mockMvc.perform(post("/api/v1/carrito/items")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(item))
                .andReturn().getResponse().getContentAsString();
    }

    @Test
    void verCarritoCreaUnoVacioLaPrimeraVez() throws Exception {
        mockMvc.perform(get("/api/v1/carrito")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("PENDIENTE"))
                .andExpect(jsonPath("$.total").value(0))
                .andExpect(jsonPath("$.detalles").isEmpty());
    }

    @Test
    void agregarProductoCalculaElTotalConElPrecioUnitario() throws Exception {
        mockMvc.perform(post("/api/v1/carrito/items")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"P001\",\"cantidad\":2}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(20000))
                .andExpect(jsonPath("$.detalles[0].cantidad").value(2))
                .andExpect(jsonPath("$.detalles[0].precioUnitario").value(10000))
                .andExpect(jsonPath("$.detalles[0].producto.codigo").value("P001"));
    }

    @Test
    void agregarDosVecesElMismoProductoSumaLaCantidad() throws Exception {
        agregar("P001", 2);

        mockMvc.perform(post("/api/v1/carrito/items")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"P001\",\"cantidad\":3}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.detalles.length()").value(1))
                .andExpect(jsonPath("$.detalles[0].cantidad").value(5))
                .andExpect(jsonPath("$.total").value(50000));
    }

    @Test
    void noSePuedeAgregarMasUnidadesDelStockDisponible() throws Exception {
        mockMvc.perform(post("/api/v1/carrito/items")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"P001\",\"cantidad\":6}"))
                .andExpect(status().isConflict());

        mockMvc.perform(get("/api/v1/productos/P001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stock").value(5));
    }

    @Test
    void agregarProductoInexistenteDevuelve404() throws Exception {
        mockMvc.perform(post("/api/v1/carrito/items")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"NOEXISTE\",\"cantidad\":1}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void modificarCantidadActualizaElTotalYCeroEliminaElItem() throws Exception {
        agregar("P001", 2);

        mockMvc.perform(put("/api/v1/carrito/items/P001")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"P001\",\"cantidad\":4}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.detalles[0].cantidad").value(4))
                .andExpect(jsonPath("$.total").value(40000));

        mockMvc.perform(put("/api/v1/carrito/items/P001")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"codigo\":\"P001\",\"cantidad\":0}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.detalles").isEmpty())
                .andExpect(jsonPath("$.total").value(0));
    }

    @Test
    void eliminarItemYVaciarCarritoDejanElTotalEnCero() throws Exception {
        agregar("P001", 2);

        mockMvc.perform(delete("/api/v1/carrito/items/P001")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.detalles").isEmpty())
                .andExpect(jsonPath("$.total").value(0));

        agregar("P001", 1);

        mockMvc.perform(delete("/api/v1/carrito")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.detalles").isEmpty())
                .andExpect(jsonPath("$.total").value(0));
    }

    @Test
    void finalizarCompraMarcaPedidoPagadoDescuentaStockYCreaCarritoNuevo() throws Exception {
        crearUsuario("admin@test.com", "ADMIN", "Clave123.");
        String tokenAdmin = token("admin@test.com", "Clave123.");
        agregar("P001", 2);

        mockMvc.perform(post("/api/v1/carrito/finalizar")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("PAGADO"))
                .andExpect(jsonPath("$.total").value(20000));

        mockMvc.perform(get("/api/v1/productos/P001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stock").value(3));

        mockMvc.perform(get("/api/v1/carrito")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.estado").value("PENDIENTE"))
                .andExpect(jsonPath("$.total").value(0));

        mockMvc.perform(get("/api/v1/pedidos")
                        .header("Authorization", "Bearer " + tokenAdmin))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].estado").value("PAGADO"))
                .andExpect(jsonPath("$[0].total").value(20000));
    }

    @Test
    void finalizarCarritoVacioDevuelve400() throws Exception {
        mockMvc.perform(get("/api/v1/carrito")
                        .header("Authorization", "Bearer " + token));

        mockMvc.perform(post("/api/v1/carrito/finalizar")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }
}
