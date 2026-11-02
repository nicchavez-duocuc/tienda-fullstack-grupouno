// services/usuarios.jsx
// El usuario actual. Reemplaza a esUsuarioDuoc() de Script.js y a la lectura
// del usuario que hacía usuarios.js para el header.

// El usuario que inició sesión, o null si no hay sesión
export function obtenerUsuarioActivo() {
    try {
        return JSON.parse(localStorage.getItem("usuarioActivo"));
    } catch {
        return null;
    }
}

// ¿El usuario actual tiene un correo @duocuc.cl? (si es así, se le aplica el
// 20% de descuento)
export function esUsuarioDuoc() {
    try {
        // 1. Revisar si hay sesión activa en usuarioActivo
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuarioActivo && usuarioActivo.correo) {
            return usuarioActivo.correo.toLowerCase().endsWith("@duocuc.cl");
        }

        // 2. Si no hay sesión activa, revisar la lista general UsuariosGamer
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
