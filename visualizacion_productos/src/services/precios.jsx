// services/precios.jsx
// Descuento Duoc. Reemplaza los "Math.round(producto.precio * 0.80)" que
// estaban repetidos en Script.js.

export const FACTOR_DUOC = 0.8; // 20% de descuento

export function aplicarDescuentoDuoc(precio) {
    return Math.round(precio * FACTOR_DUOC);
}
