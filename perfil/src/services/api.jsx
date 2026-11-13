// perfil/src/services/api.jsx
// Comunicación con el backend para editar el perfil propio.
// El backend expone: PUT /api/v1/usuarios/me
//   body: { apodo?, avatar?, claveAnterior?, claveNueva? }
// Requiere el token JWT guardado en "jwtActivo" por el login.

export const BASE_API = "http://localhost:8080/api/v1";
export const CLAVE_JWT = "jwtActivo";

// Error especial: no hay sesión o el token ya no sirve.
export class ErrorSesion extends Error {
    constructor(mensaje = "No hay una sesión activa. Redirigiendo al Login.") {
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

// Actualiza apodo, avatar y/o clave del usuario con sesión activa.
export async function actualizarMiPerfil(cambios) {
    const token = obtenerToken();

    let respuesta;
    try {
        respuesta = await fetch(BASE_API + "/usuarios/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(cambios)
        });
    } catch {
        throw new Error(
            "No se pudo contactar al servidor. Verifica que el backend esté corriendo en http://localhost:8080."
        );
    }

    if (respuesta.status === 401 || respuesta.status === 403) {
        throw new ErrorSesion();
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
        const mensaje = (datos && (datos.mensaje || Object.values(datos)[0])) || "No se pudo actualizar el perfil.";
        throw new Error(mensaje);
    }

    return datos;
}

export function mensajeDeError(error) {
    return error?.message || "Ocurrió un error inesperado.";
}
