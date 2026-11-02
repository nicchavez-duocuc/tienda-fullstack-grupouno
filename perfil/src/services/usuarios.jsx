// services/usuarios.jsx
// Usuario activo y lista de usuarios en localStorage. Son funciones puras: no
// usan document.getElementById ni alert.
// (Antes estaba dentro de usuarios.js, bloque "LÓGICA DEL PERFIL".)

const CLAVE_USUARIOS = "UsuariosGamer";
const CLAVE_USUARIO_ACTIVO = "usuarioActivo";

// El usuario que inició sesión, o null si no hay sesión
export function obtenerUsuarioActivo() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_USUARIO_ACTIVO));
    } catch {
        return null;
    }
}

function obtenerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
    } catch {
        return [];
    }
}

// Guarda los cambios del perfil en los dos lugares: en la sesión activa y en
// la lista general de usuarios (solo cambia al usuario con el mismo correo).
export function guardarPerfil(usuarioActualizado) {
    const usuarios = obtenerUsuarios().map((usuario) =>
        usuario.correo === usuarioActualizado.correo ? { ...usuario, ...usuarioActualizado } : usuario
    );

    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(usuarioActualizado));
}
