// services/carrito.jsx
// Lectura y escritura del carrito en localStorage.
// (Antes estaba en utils.js: leerCarrito, guardarCarrito y CLAVE_CARRITO.)

export const CLAVE_CARRITO = "carritoGamer";

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

// Borra el carrito por completo (al vaciarlo o al pagar)
export function eliminarCarrito() {
    localStorage.removeItem(CLAVE_CARRITO);
}
