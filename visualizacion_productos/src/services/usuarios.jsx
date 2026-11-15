// services/usuarios.jsx
// Sesión del usuario. Igual que antes: el marcador es la entrada
// "usuarioActivo" de localStorage (ahora la guarda la página de Login cuando
// el backend confirma el JWT). El nombre y el rol llegan del backend.
// El descuento sigue dependiendo de que el correo termine en @duocuc.cl.

import { haySesion } from "./api.jsx";

// El usuario que inició sesión, o null si no hay sesión
export function obtenerUsuarioActivo() {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        return haySesion() ? usuario : null;
    } catch {
        return null;
    }
}

// ¿El usuario actual tiene un correo @duocuc.cl? (si es así, se le aplica el
// 20% de descuento)
export function esUsuarioDuoc() {
    try {
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuarioActivo && usuarioActivo.correo) {
            return usuarioActivo.correo.toLowerCase().endsWith("@duocuc.cl");
        }

        // Sin sesión activa: revisar la lista general UsuariosGamer
        const usuarios = JSON.parse(localStorage.getItem("UsuariosGamer")) || [];
        if (usuarios.length > 0) {
            const ultimo = usuarios[usuarios.length - 1];
            return Boolean(ultimo && ultimo.correo && ultimo.correo.toLowerCase().endsWith("@duocuc.cl"));
        }
    } catch {
        // JSON dañado en localStorage: simplemente no se aplica descuento
    }
    return false;
}

// ¿Qué rol tiene la sesión activa? (ADMIN, VENDEDOR, COMPRADOR o null)
export function obtenerRolActivo() {
    const usuario = obtenerUsuarioActivo();
    return usuario ? usuario.rol : null;
}

// Cerrar sesión: se limpian el token JWT y los datos del usuario
export function cerrarSesion() {
    localStorage.removeItem("jwtActivo");
    localStorage.removeItem("usuarioActivo");
}
