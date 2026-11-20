// Login/src/services/api.jsx
// Comunicación con el backend Spring Boot para registro e inicio de sesión.
// El backend responde:
//   POST /auth/login     -> { token, usuario: { id, nombre, apodo, correo, avatar, rol } }
//   POST /auth/registrar -> { id, nombre, apodo, correo, avatar, rol }
// La sesión se guarda en localStorage con las mismas claves que usan la tienda
// y el panel de administración: "jwtActivo" y "usuarioActivo".

export const BASE_API = "http://localhost:8080/api/v1";
export const CLAVE_JWT = "jwtActivo";
export const CLAVE_USUARIO_ACTIVO = "usuarioActivo";

// Hace una petición JSON al backend y devuelve la respuesta ya convertida.
async function peticion(ruta, opciones = {}) {
    let respuesta;

    try {
        respuesta = await fetch(BASE_API + ruta, {
            ...opciones,
            headers: {
                "Content-Type": "application/json",
                ...(opciones.headers || {})
            }
        });
    } catch {
        throw new Error(
            "No se pudo contactar al servidor. Verifica que el backend esté corriendo en http://localhost:8080."
        );
    }

    const texto = await respuesta.text();
    let datos = null;

    if (texto) {
        try {
            datos = JSON.parse(texto);
        } catch {
            datos = texto;
        }
    }

    if (!respuesta.ok) {
        throw new Error(mensajeDelBackend(datos, respuesta.status));
    }

    return datos;
}

// Extrae un mensaje legible de los distintos formatos de error del backend:
//   { mensaje: "..." }                       -> errores de negocio
//   { campo: "mensaje de validación", ... }  -> errores de @Valid
function mensajeDelBackend(datos, estado) {
    if (datos && typeof datos === "object") {
        if (datos.mensaje) return datos.mensaje;

        const primerCampo = Object.values(datos)[0];
        if (typeof primerCampo === "string" && primerCampo) return primerCampo;
    }

    if (typeof datos === "string" && datos) return datos;

    if (estado === 401) return "Correo o clave incorrectos.";
    if (estado === 409) return "El correo ya está registrado.";
    return `El servidor respondió con el código ${estado}.`;
}

// Inicia sesión contra el backend. Devuelve { token, usuario }.
export function iniciarSesionBackend(correo, clave) {
    return peticion("/auth/login", {
        method: "POST",
        body: JSON.stringify({ correo, clave })
    });
}

// Crea una cuenta nueva (el backend siempre asigna el rol COMPRADOR).
export function registrarUsuarioBackend({ nombre, apellido, fecha, correo, clave }) {
    return peticion("/auth/registrar", {
        method: "POST",
        body: JSON.stringify({ nombre, apellido, fecha, correo, clave })
    });
}

// Guarda el token y los datos del usuario para que la tienda y el panel ADMIN
// puedan reconocer la sesión.
export function guardarSesion({ token, usuario }) {
    localStorage.setItem(CLAVE_JWT, token);
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(usuario));
}

export function obtenerToken() {
    return localStorage.getItem(CLAVE_JWT) || "";
}

export function cerrarSesion() {
    localStorage.removeItem(CLAVE_JWT);
    localStorage.removeItem(CLAVE_USUARIO_ACTIVO);
}
