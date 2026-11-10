// services/carrito.jsx
// El carrito ya NO vive en localStorage: vive en la base de datos (el pedido
// con estado PENDIENTE de cada usuario). Esta función manda el producto al
// backend con POST /api/v1/carrito/items y devuelve el carrito actualizado.
// El precio que guarda el detalle es el precio ORIGINAL (el descuento Duoc se
// aplica solo al mostrarlo), igual que antes.

import { peticion } from "./api.jsx";

// Agrega un producto (o suma su cantidad si ya estaba). Devuelve la lista de
// detalles del carrito ya actualizada
export async function agregarProductoAlCarrito(producto) {
    const carrito = await peticion("/carrito/items", {
        metodo: "POST",
        cuerpo: { codigo: producto.codigo, cantidad: 1 }
    });
    return carrito.detalles || [];
}
