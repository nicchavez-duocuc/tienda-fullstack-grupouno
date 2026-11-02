// hooks/useModalesProducto.jsx
// Los dos modales que salen desde las tarjetas: el de detalle (al hacer clic
// en la imagen) y el de "producto agregado" (al añadir al carrito).
// Reemplaza a verDetalle(), cerrarModalDetalle(), agregarAlCarrito(),
// mostrarModalAgregado() y cerrarModal() de Script.js.
//
// detalle  = null (cerrado) o el producto que se está viendo
// agregado = null (cerrado) o { producto, precio } del producto recién agregado

import { useState } from "react";
import { productos } from "../productos.js";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { aplicarDescuentoDuoc } from "../services/precios.jsx";
import { agregarProductoAlCarrito } from "../services/carrito.jsx";

function buscarProducto(codigo) {
    return productos.find((p) => p.codigo === codigo);
}

export function useModalesProducto() {
    const [detalle, setDetalle] = useState(null);
    const [agregado, setAgregado] = useState(null);

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
