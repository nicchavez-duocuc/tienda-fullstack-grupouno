package com.fullstack.productos.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fullstack.productos.Repository.UsuarioRepository;
import com.fullstack.productos.dto.LoginSolicitud;
import com.fullstack.productos.dto.RegistroSolicitud;
import com.fullstack.productos.dto.SesionRespuesta;
import com.fullstack.productos.dto.UsuarioRespuesta;
import com.fullstack.productos.model.Usuario;
import com.fullstack.productos.security.JwtServicio;

import java.time.LocalDate;
import java.util.Map;

// Registro, inicio de sesión y datos de la sesión actual
@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtServicio jwtServicio;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder codificador;

    public static final String ROL_DEFECTO = "COMPRADOR";

    // Crea la cuenta. Siempre es COMPRADOR; los roles VENDEDOR/ADMIN los
    // cambia el administrador desde el panel
    public UsuarioRespuesta registrar(RegistroSolicitud datos) {
        if (usuarioRepository.existsByCorreoIgnoreCase(datos.correo().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya está registrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(datos.nombre().trim());
        usuario.setApellido(datos.apellido().trim());
        usuario.setApodo(datos.nombre().trim()); // igual que hacía el frontend
        try {
            usuario.setFechaNacimiento(LocalDate.parse(datos.fecha()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de nacimiento es inválida (usa aaaa-mm-dd).");
        }
        usuario.setCorreo(datos.correo().trim());
        usuario.setClave(codificador.encode(datos.clave()));
        usuario.setAvatar("");
        usuario.setRol(ROL_DEFECTO);

        return aRespuesta(usuarioRepository.save(usuario));
    }

    // Correo + clave correctos → devuelve el JWT y los datos del usuario
    public SesionRespuesta iniciarSesion(LoginSolicitud datos) {
        Usuario usuario = usuarioRepository.findByCorreoIgnoreCase(datos.correo().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Correo o clave incorrectos."));

        if (!codificador.matches(datos.clave(), usuario.getClave())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Correo o clave incorrectos.");
        }

        String token = jwtServicio.crearToken(usuario.getCorreo(), usuario.getRol());
        return new SesionRespuesta(token, aRespuesta(usuario));
    }

    // Datos del usuario del token (para /auth/me y el header de la tienda)
    public UsuarioRespuesta usuarioActual(Authentication autenticacion) {
        Usuario usuario = entidadActual(autenticacion);
        return aRespuesta(usuario);
    }

    // Entidad completa del usuario del token (para usarlo en otras lógicas)
    public Usuario entidadActual(Authentication autenticacion) {
        if (autenticacion == null || autenticacion.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Debes iniciar sesión.");
        }
        return usuarioRepository.findByCorreoIgnoreCase(autenticacion.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "La sesión ya no es válida."));
    }

    // El usuario edita SU PROPIO perfil: apodo, avatar y (si quiere) su clave.
    // La clave nueva siempre exige la clave anterior (igual que en la página)
    public UsuarioRespuesta actualizarPerfil(Usuario usuario, Map<String, String> cambios) {
        String apodo = cambios.get("apodo");
        String avatar = cambios.get("avatar");
        String claveAnterior = cambios.get("claveAnterior");
        String claveNueva = cambios.get("claveNueva");

        boolean quiereClave = (claveAnterior != null && !claveAnterior.isBlank())
                || (claveNueva != null && !claveNueva.isBlank());

        if (quiereClave) {
            if (claveAnterior == null || claveAnterior.isBlank()
                    || !codificador.matches(claveAnterior, usuario.getClave())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: La contraseña actual es incorrecta.");
            }
            if (claveNueva == null || claveNueva.isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Por favor ingresa la nueva contraseña.");
            }
            usuario.setClave(codificador.encode(claveNueva.trim()));
        }

        if (apodo != null && !apodo.isBlank()) {
            usuario.setApodo(apodo.trim());
        }
        if (avatar != null && !avatar.isBlank()) {
            usuario.setAvatar(avatar);
        }

        return aRespuesta(usuarioRepository.save(usuario));
    }

    // Convierte la entidad a la respuesta pública (misma forma que "usuarioActivo")
    public UsuarioRespuesta aRespuesta(Usuario usuario) {
        return new UsuarioRespuesta(usuario.getId(), usuario.getNombre(), usuario.getApodo(),
                usuario.getCorreo(), usuario.getAvatar(), usuario.getRol());
    }
}
