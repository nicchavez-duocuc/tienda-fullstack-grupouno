// hooks/useModalesProducto.jsx
// Los dos modales que salen desde las tarjetas: el de detalle (al hacer clic
// en la imagen) y el de "producto agregado" (al añadir al carrito).
//
// Recibe la lista de productos que ya cargó useCatalogo (viene del backend),
// así el detalle y el carrito funcionan también con productos nuevos.
//
// detalle  = null (cerrado) o el producto que se está viendo
// agregado = null (cerrado) o { producto, precio } del producto recién agregado

import { useState } from "react";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { aplicarDescuentoDuoc } from "../services/precios.jsx";
import { agregarProductoAlCarrito } from "../services/carrito.jsx";

export function useModalesProducto(productos = []) {
    const [detalle, setDetalle] = useState(null);
    const [agregado, setAgregado] = useState(null);

    function buscarProducto(codigo) {
        return productos.find((p) => p.codigo === String(codigo));
    }

    function verDetalle(codigo) {
        const producto = buscarProducto(codigo);
        if (!producto) return;
        setDetalle({ ...producto, precioDescuento: aplicarDescuentoDuoc(producto.precio) });
    }

    function cerrarDetalle() {
        setDetalle(null);
    }

    function agregarAlCarrito(codigo) {
        const producto = buscarProducto(codigo);
        if (!producto) return;

        // El modal muestra el precio que paga este usuario (con descuento si es Duoc)
        const precio = esUsuarioDuoc() ? aplicarDescuentoDuoc(producto.precio) : producto.precio;

        agregarProductoAlCarrito(producto);
        setAgregado({ producto, precio });
    }

    // Botón "Añadir al Carrito" dentro del detalle: cierra el detalle y agrega
    function agregarDesdeDetalle(codigo) {
        cerrarDetalle();
        agregarAlCarrito(codigo);
    }

    function cerrarAgregado() {
        setAgregado(null);
    }

    return { detalle, agregado, verDetalle, cerrarDetalle, agregarAlCarrito, agregarDesdeDetalle, cerrarAgregado };
}
