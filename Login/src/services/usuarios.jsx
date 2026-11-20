// services/usuarios.jsx
// Usuarios y sesión en localStorage: buscar un usuario para iniciar sesión y
// guardar uno nuevo al registrarse. Son funciones puras: no usan
// document.getElementById ni alert.
// (Antes estaba en usuariosUtils.js.)

export const CLAVE_USUARIOS = "UsuariosGamer";
export const CLAVE_USUARIO_ACTIVO = "usuarioActivo";

export function obtenerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
    } catch {
        return [];
    }
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

// Deja a este usuario como la sesión activa
export function guardarUsuarioActivo(usuario) {
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(usuario));
}

// Busca un usuario que coincida con correo + clave. Devuelve el usuario o null.
export function iniciarSesion(correo, clave) {
    const usuarios = obtenerUsuarios();
    return usuarios.find((u) => u.correo === correo && u.clave === clave) || null;
}

// Crea el usuario, lo guarda en la lista y lo marca como sesión activa.
// Devuelve el usuario creado.
export function registrarUsuario({ nombre, apellido, fecha, correo, clave }) {
    const nuevoUsuario = {
        nombre: `${nombre} ${apellido}`,
        apodo: nombre,
        fechaNacimiento: fecha,
        correo,
        clave,
        avatar: ""
    };

    const usuarios = obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    guardarUsuarioActivo(nuevoUsuario);

    return nuevoUsuario;
}
