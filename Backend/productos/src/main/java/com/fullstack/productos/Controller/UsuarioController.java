package com.fullstack.productos.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstack.productos.Service.AuthService;
import com.fullstack.productos.Service.PedidoService;
import com.fullstack.productos.Service.UsuarioService;
import com.fullstack.productos.dto.UsuarioRespuesta;
import com.fullstack.productos.model.Pedido;
import com.fullstack.productos.model.Usuario;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

// CRUD de usuarios: solo ADMIN (la cadena de seguridad lo exige)
@Tag(name = "Usuarios", description = "CRUD de cuentas (solo ADMIN)")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AuthService authService;
    private final PedidoService pedidoService;

    public UsuarioController(UsuarioService usuarioService, AuthService authService, PedidoService pedidoService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
        this.pedidoService = pedidoService;
    }

    // Lista de todas las cuentas
    @Operation(summary = "Listar todas las cuentas (ADMIN)")
    @GetMapping
    public List<UsuarioRespuesta> listar() {
        return usuarioService.listarUsuarios().stream().map(authService::aRespuesta).toList();
    }

    // Datos de una cuenta por id
    @Operation(summary = "Buscar una cuenta por id (ADMIN)")
    @GetMapping("/{id}")
    public UsuarioRespuesta buscar(@PathVariable Long id) {
        return authService.aRespuesta(usuarioService.buscarPorId(id));
    }

    // El usuario edita su PROPIO perfil (apodo, avatar, clave) desde la página
    // de perfil. La clave nueva exige la clave anterior
    @Operation(summary = "Actualizar mi propio perfil (cualquier usuario con sesión)", description = "Acepta apodo, avatar y claveNueva (exige claveAnterior para cambiarla)")
    @PutMapping("/me")
    public UsuarioRespuesta actualizarMiPerfil(Authentication autenticacion, @RequestBody Map<String, String> cambios) {
        Usuario usuario = authService.entidadActual(autenticacion);
        return authService.actualizarPerfil(usuario, cambios);
    }

    // Historial de compras de una cuenta (pedidos con sus detalles)
    @Operation(summary = "Pedidos (compras) de una cuenta (ADMIN)")
    @GetMapping("/{id}/pedidos")
    public List<Pedido> pedidosDelUsuario(@PathVariable Long id) {
        usuarioService.buscarPorId(id); // valida que exista
        return pedidoService.listarPedidosDeUsuario(id);
    }

    // Actualizar apodo, clave y/o rol
    @Operation(summary = "Actualizar apodo, clave y/o rol de una cuenta (ADMIN)", description = "La clave nueva llega en texto al panel. El rol acepta: ADMIN, VENDEDOR, COMPRADOR")
    @PutMapping("/{id}")
    public UsuarioRespuesta actualizar(@PathVariable Long id, @RequestBody Map<String, String> cambios) {
        Usuario usuario = usuarioService.actualizarUsuario(
                id,
                cambios.get("apodo"),
                cambios.get("clave"),
                java.util.Optional.ofNullable(cambios.get("rol")));
        return authService.aRespuesta(usuario);
    }

    // Eliminar cuenta
    @Operation(summary = "Eliminar una cuenta (ADMIN)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
