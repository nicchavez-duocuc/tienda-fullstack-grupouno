package com.fullstack.productos;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fullstack.productos.Repository.CategoriaRepository;
import com.fullstack.productos.Repository.DetallePedidoRepository;
import com.fullstack.productos.Repository.PedidoRepository;
import com.fullstack.productos.Repository.ProductoRepository;
import com.fullstack.productos.Repository.UsuarioRepository;
import com.fullstack.productos.model.Categoria;
import com.fullstack.productos.model.Producto;
import com.fullstack.productos.model.Usuario;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Utilidades compartidas por los tests de integracion (Spring + MockMvc + H2).
 * Las clases concretas ponen las anotaciones @SpringBootTest,
 * @AutoConfigureMockMvc y @ActiveProfiles("test").
 */
abstract class BaseIntegracionTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected UsuarioRepository usuarioRepository;

    @Autowired
    protected CategoriaRepository categoriaRepository;

    @Autowired
    protected ProductoRepository productoRepository;

    @Autowired
    protected PedidoRepository pedidoRepository;

    @Autowired
    protected DetallePedidoRepository detallePedidoRepository;

    @Autowired
    protected PasswordEncoder codificador;

    protected final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void limpiarDatos() {
        // Orden importante: detalles -> pedidos -> productos -> categorias -> usuarios
        detallePedidoRepository.deleteAll();
        pedidoRepository.deleteAll();
        productoRepository.deleteAll();
        categoriaRepository.deleteAll();
        usuarioRepository.deleteAll();
    }

    protected Usuario crearUsuario(String correo, String rol, String clave) {
        Usuario usuario = new Usuario();
        usuario.setNombre("Usuario");
        usuario.setApellido("Prueba");
        usuario.setApodo("User");
        usuario.setFechaNacimiento(LocalDate.of(2000, 1, 1));
        usuario.setCorreo(correo);
        usuario.setClave(codificador.encode(clave));
        usuario.setAvatar("");
        usuario.setRol(rol);
        return usuarioRepository.save(usuario);
    }

    protected Categoria crearCategoria(String nombre) {
        Categoria categoria = new Categoria();
        categoria.setNombre(nombre);
        categoria.setDescripcion("Categoria de prueba");
        return categoriaRepository.save(categoria);
    }

    protected Producto crearProducto(String codigo, long precio, long stock, Categoria categoria, Integer idVendedor) {
        Producto producto = new Producto();
        producto.setCodigo(codigo);
        producto.setNombre("Producto " + codigo);
        producto.setPrecio(precio);
        producto.setCategoria(categoria);
        producto.setImagen("img.png");
        producto.setStock(stock);
        producto.setDescripcion("Producto de prueba");
        producto.setIdVendedor(idVendedor);
        producto.setEstado("DISPONIBLE");
        return productoRepository.save(producto);
    }

    /** Loguea por HTTP y devuelve el JWT para usarlo en el header Authorization. */
    protected String token(String correo, String clave) throws Exception {
        String cuerpo = "{\"correo\":\"" + correo + "\",\"clave\":\"" + clave + "\"}";
        String respuesta = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(cuerpo))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(respuesta).get("token").asText();
    }
}
