package com.fullstack.productos.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fullstack.productos.Repository.UsuarioRepository;
import com.fullstack.productos.model.Usuario;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Lista de todas las cuentas (solo ADMIN)
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // Buscar una cuenta por id (solo ADMIN)
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe el usuario con id " + id));
    }

    // Actualizar apodo y/o clave de una cuenta (solo ADMIN). La clave nueva
    // llega en texto y se guarda con BCrypt
    public Usuario actualizarUsuario(Long id, String apodo, String claveNueva, java.util.Optional<String> rol) {
        Usuario usuario = buscarPorId(id);

        if (apodo != null && !apodo.trim().isEmpty()) {
            usuario.setApodo(apodo.trim());
        }
        if (claveNueva != null && !claveNueva.trim().isEmpty()) {
            usuario.setClave(codificarClave(claveNueva.trim()));
        }
        // Solo el ADMIN puede cambiar roles
        if (rol != null && rol.isPresent() && !rol.get().isBlank()) {
            String rolNuevo = rol.get().trim().toUpperCase();
            if (!List.of("ADMIN", "VENDEDOR", "COMPRADOR").contains(rolNuevo)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rol inválido: " + rolNuevo);
            }
            usuario.setRol(rolNuevo);
        }

        return usuarioRepository.save(usuario);
    }

    // Eliminar una cuenta (solo ADMIN)
    public void eliminarUsuario(Long id) {
        Usuario usuario = buscarPorId(id);
        try {
            usuarioRepository.delete(usuario);
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede eliminar el usuario porque tiene pedidos o reseñas");
        }
    }

    // Codificador de claves (BCrypt). Bean definido en SeguridadConfig
    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder codificador;

    public String codificarClave(String clave) {
        return codificador.encode(clave);
    }
}
