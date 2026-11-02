// services/usuarios.jsx
// ¿El usuario actual tiene un correo @duocuc.cl? (si es así, se le aplica el
// 20% de descuento). Antes estaba en utils.js como esUsuarioDuoc().

export function esUsuarioDuoc() {
    try {
        // 1. Sesión activa
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuarioActivo && usuarioActivo.correo) {
            return usuarioActivo.correo.toLowerCase().trim().endsWith("@duocuc.cl");
        }

        // 2. Último usuario registrado
        const usuariosGuardados = JSON.parse(localStorage.getItem("UsuariosGamer")) || [];
        if (usuariosGuardados.length > 0) {
            const ultimo = usuariosGuardados[usuariosGuardados.length - 1];
            if (ultimo && ultimo.correo) {
                return ultimo.correo.toLowerCase().trim().endsWith("@duocuc.cl");
            }
        }
    } catch {
        // Si el JSON guardado está corrupto, simplemente no aplicamos descuento
    }
    return false;
}
