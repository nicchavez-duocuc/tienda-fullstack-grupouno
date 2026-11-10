// services/usuarios.jsx
// Datos del usuario y guardado del perfil. El usuario con sesión activa lo
// guarda el Login (desde el backend) en "usuarioActivo". Los cambios del
// perfil se mandan al backend con PUT /api/v1/usuarios/me, que valida la
// clave anterior antes de cambiarla y guarda todo en la base de datos.

import { peticion } from "../../../visualizacion_productos/src/services/api.jsx";

const CLAVE_USUARIO_ACTIVO = "usuarioActivo";

// El usuario que inició sesión, o null si no hay sesión
export function obtenerUsuarioActivo() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_USUARIO_ACTIVO));
    } catch {
        return null;
    }
}

// Guarda los cambios del perfil en el backend y actualiza "usuarioActivo"
// con lo que devuelve el servidor. Solo se actualizan apodo, avatar y clave.
export async function guardarPerfil(usuarioActualizado) {
    const respuesta = await peticion("/usuarios/me", {
        metodo: "PUT",
        cuerpo: {
            apodo: usuarioActualizado.apodo || "",
            avatar: usuarioActualizado.avatar || "",
            claveAnterior: usuarioActualizado.claveAnterior || "",
            claveNueva: usuarioActualizado.claveNueva || ""
        }
    });

    // La respuesta trae los datos del usuario ya actualizados (sin clave)
    localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(respuesta));
    return respuesta;
}
