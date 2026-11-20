// services/precios.jsx
// Cálculo de precios con el descuento Duoc. Funciones puras: no leen
// localStorage ni tocan el DOM. (Antes estaba en utils.js: calcularPrecios.)

export const FACTOR_DUOC = 0.8; // 20% de descuento

// Devuelve el precio base y el precio final (con 20% si es usuario Duoc)
export function calcularPrecios(producto, esDuoc) {
    const precioBase = producto.precioOriginal || producto.precio;
    const precioFinal = esDuoc ? Math.round(precioBase * FACTOR_DUOC) : precioBase;
    return { precioBase, precioFinal };
}
