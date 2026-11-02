// services/carrito.jsx
// Reemplaza la parte de localStorage de agregarAlCarrito() de Script.js.
// Guarda el producto con su precio ORIGINAL (el descuento Duoc se aplica al
// mostrarlo), igual que antes, para que la página del carrito lo lea bien.

const CLAVE_CARRITO = "carritoGamer";

export function agregarProductoAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];

    const index = carrito.findIndex((p) => p.codigo === producto.codigo);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}
