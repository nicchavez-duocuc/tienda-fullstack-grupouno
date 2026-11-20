export const BASE_API_VENDEDOR = "http://localhost:8080/api/v1";
export const CLAVE_JWT_VENDEDOR = "jwtActivo";
export const CLAVE_USUARIO_VENDEDOR = "usuarioActivo";
export const RUTA_LOGIN_VENDEDOR = "../Login/Inicio_Sesion.html";

export class ErrorSesionVendedor extends Error {
    constructor(mensaje = "Necesitas iniciar sesión como VENDEDOR para acceder a este panel.") {
        super(mensaje);
        this.name = "ErrorSesionVendedor";
    }
}

export function obtenerTokenVendedor() {
    return localStorage.getItem(CLAVE_JWT_VENDEDOR) || "";
}

export function obtenerUsuarioVendedor() {
    const raw = localStorage.getItem(CLAVE_USUARIO_VENDEDOR);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function cerrarSesionVendedor() {
    localStorage.removeItem(CLAVE_JWT_VENDEDOR);
    localStorage.removeItem(CLAVE_USUARIO_VENDEDOR);
    window.location.href = RUTA_LOGIN_VENDEDOR;
}

export function redirigirLoginVendedor(mensaje = "Necesitas iniciar sesión como VENDEDOR para usar este panel.") {
    alert(mensaje);
    window.location.href = RUTA_LOGIN_VENDEDOR;
}

export async function peticionVendedor(ruta, opciones = {}) {
    const { headers, ...resto } = opciones;
    const token = obtenerTokenVendedor();

    let respuesta;
    try {
        respuesta = await fetch(BASE_API_VENDEDOR + ruta, {
            ...resto,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(headers || {})
            }
        });
    } catch {
        throw new Error("No se pudo contactar al backend en http://localhost:8080.");
    }

    if (respuesta.status === 401 || respuesta.status === 403) {
        throw new ErrorSesionVendedor();
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
        let mensaje = null;
        if (datos && typeof datos === "object") {
            mensaje = datos.mensaje || datos.error || Object.values(datos).find((v) => typeof v === "string" && v);
        }
        if (!mensaje && typeof datos === "string") mensaje = datos;
        throw new Error(mensaje || `Error HTTP ${respuesta.status}`);
    }

    return datos;
}