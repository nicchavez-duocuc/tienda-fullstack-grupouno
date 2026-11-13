// admin/comun/api.jsx
// Utilidades compartidas por los cuatro paneles de administración.
// Centraliza la URL del backend, el token JWT y el manejo de errores para no
// repetir la misma lógica en cada página.

export const BASE_API = "http://localhost:8080/api/v1";
export const CLAVE_JWT = "jwtActivo";
export const RUTA_LOGIN = "../../Login/Inicio_Sesion.html";

// Error especial: el backend respondió 401/403 (sin sesión o sin rol ADMIN)
export class ErrorSesion extends Error {
    constructor(mensaje = "Necesitas iniciar sesión como ADMIN para usar este panel.") {
        super(mensaje);
        this.name = "ErrorSesion";
    }
}

export function obtenerToken() {
    return localStorage.getItem(CLAVE_JWT) || "";
}

export function haySesion() {
    return Boolean(obtenerToken());
}

// Hace una petición al backend y devuelve el JSON (o null si no hay cuerpo).
// Lanza ErrorSesion cuando el token falta/expiró o el rol no alcanza.
export async function pedir(ruta, opciones = {}) {
    const { headers, ...resto } = opciones;
    const token = obtenerToken();

    let respuesta;
    try {
        respuesta = await fetch(BASE_API + ruta, {
            ...resto,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(headers || {})
            }
        });
    } catch {
        throw new Error("No se pudo contactar al backend en http://localhost:8080. ¿Está corriendo Spring Boot?");
    }

    if (respuesta.status === 401 || respuesta.status === 403) {
        throw new ErrorSesion();
    }

    if (respuesta.status === 204) {
        return null;
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
        const mensaje =
            (datos && (datos.mensaje || datos.error)) ||
            `El servidor respondió con el código ${respuesta.status}.`;
        throw new Error(mensaje);
    }

    return datos;
}

// Manda al login cuando no hay sesión o el rol no permite entrar
export function enviarAlLogin() {
    alert("Necesitas iniciar sesión como ADMIN para usar este panel.");
    window.location.href = RUTA_LOGIN;
}

// Texto legible para cualquier error lanzado por pedir()
export function mensajeDeError(error) {
    return error?.message || "Ocurrió un error inesperado.";
}
