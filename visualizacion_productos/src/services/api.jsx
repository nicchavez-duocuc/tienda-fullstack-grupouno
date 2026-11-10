// services/api.jsx
// Único punto de contacto con el backend de Spring Boot. Todas las peticiones
// van a /api/v1/** y llevan el token JWT guardado en localStorage si existe.
// Si el backend responde 401 (sin sesión) o 403 (sin permiso), el error que
// devuelve peticion() lleva el código y el mensaje claro para mostrarlo.

const BASE_URL = "http://localhost:8080/api/v1";

const CLAVE_TOKEN = "jwtActivo";

export function obtenerToken() {
    return localStorage.getItem(CLAVE_TOKEN) || null;
}

export function guardarToken(token) {
    localStorage.setItem(CLAVE_TOKEN, token);
}

export function borrarToken() {
    localStorage.removeItem(CLAVE_TOKEN);
}

// ¿Hay sesión activa? (token + usuario guardado)
export function haySesion() {
    return Boolean(localStorage.getItem(CLAVE_TOKEN) && localStorage.getItem("usuarioActivo"));
}

// Peticion generica. Devuelve el JSON del backend o lanza
// { mensaje: "...", codigo: 401/403/... }
export async function peticion(ruta, opciones = {}) {
    const token = obtenerToken();

    const respuesta = await fetch(BASE_URL + ruta, {
        method: opciones.metodo || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: "Bearer " + token } : {})
        },
        body: opciones.cuerpo ? JSON.stringify(opciones.cuerpo) : undefined
    });

    // 204 (sin contenido) y respuestas con cuerpo vacío
    if (respuesta.status === 204) return null;
    const texto = await respuesta.text();
    const datos = texto ? JSON.parse(texto) : null;

    if (!respuesta.ok) {
        const mensaje = (datos && (datos.mensaje || datos.message)) || "Error del servidor (" + respuesta.status + ")";
        throw { codigo: respuesta.status, mensaje };
    }

    return datos;
}
