// Funciones "puras" del carrito: solo leen localStorage y calculan, no tocan el DOM.
// Por eso viven en un módulo aparte y no dentro del componente.

export const CLAVE_CARRITO = "carritoGamer";


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

// Lee el carrito guardado. Si no hay nada (o está dañado) devuelve []
export function leerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
        return [];
    }
}

export function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Devuelve el precio base y el precio final (con 20% si es usuario Duoc)
export function calcularPrecios(producto, esDuoc) {
    const precioBase = producto.precioOriginal || producto.precio;
    const precioFinal = esDuoc ? Math.round(precioBase * 0.8) : precioBase;
    return { precioBase, precioFinal };
}
