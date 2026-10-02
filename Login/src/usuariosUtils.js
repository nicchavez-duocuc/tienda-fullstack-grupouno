// usuariosUtils.js
// Funciones puras (sin document.getElementById, sin alert) que leen y escriben
// en localStorage. Las usan LoginForm.jsx y RegisterForm.jsx.

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

// Busca un usuario que coincida con correo + clave. Devuelve el usuario o null.
export function iniciarSesion(correo, clave) {
    const usuarios = obtenerUsuarios();
    return usuarios.find((u) => u.correo === correo && u.clave === clave) || null;
}

// Misma cuenta de edad que tenías en usuarios.js (con día/mes de cumpleaños)
export function calcularEdad(fechaNacimientoStr) {
    const fechaNacimiento = new Date(fechaNacimientoStr);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
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
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(nuevoUsuario));

    return nuevoUsuario;
}
