// services/usuarios.jsx
// Registro e inicio de sesión contra el backend de Spring Boot:
//   POST /api/v1/auth/registrar  -> crea la cuenta (rol COMPRADOR)
//   POST /api/v1/auth/login      -> devuelve { token, usuario }
// El token JWT se guarda como antes la sesión ("jwtActivo") y los datos
// del usuario como "usuarioActivo", tal cual los leía la tienda y el perfil.
// Son funciones puras (no usan document ni alert).

import { guardarToken, peticion } from "../../../visualizacion_productos/src/services/api.jsx";

export const CLAVE_USUARIO_ACTIVO = "usuarioActivo";

// Guarda los datos del usuario con sesión activa (los mismos que enviaba
// antes el formulario: nombre, apodo, correo, avatar... más el rol)
export function guardarUsuarioActivo(usuario) {
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(usuario));
}

// Correo + clave contra el backend. Devuelve el usuario, o lanza un error
// { codigo, mensaje } si el correo o la clave son incorrectos
export async function iniciarSesion(correo, clave) {
    const sesion = await peticion("/auth/login", {
        metodo: "POST",
        cuerpo: { correo, clave }
    });

    guardarToken(sesion.token);
    guardarUsuarioActivo(sesion.usuario);
    return sesion.usuario;
}

// Crea la cuenta en la base de datos. El backend la deja como COMPRADOR.
// Devuelve el usuario creado, o lanza { codigo, mensaje } si el correo ya existe.
// (No inicia sesión: el usuario pasa a la página de login, como antes)
export async function registrarUsuario({ nombre, apellido, fecha, correo, clave }) {
    return peticion("/auth/registrar", {
        metodo: "POST",
        cuerpo: { nombre, apellido, fecha, correo, clave }
    });
}
