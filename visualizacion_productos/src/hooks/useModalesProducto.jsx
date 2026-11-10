// hooks/useModalesProducto.jsx
// Los dos modales que salen desde las tarjetas: el de detalle (al hacer clic
// en la imagen) y el de "producto agregado" (al añadir al carrito).
//
// El carrito ahora vive en el backend, así que agregar un producto envía
// POST /api/v1/carrito/items. Si el visitante no tiene sesión, se lo lleva a
// la página de inicio de sesión; si el backend rechaza (409 sin stock, etc.)
// se muestra el mensaje de error.
//
// detalle  = null (cerrado) o el producto que se está viendo
// agregado = null (cerrado) o { producto, precio } del producto recién agregado

import { useState } from "react";
import { haySesion } from "../services/api.jsx";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { aplicarDescuentoDuoc } from "../services/precios.jsx";
import { agregarProductoAlCarrito } from "../services/carrito.jsx";

export function useModalesProducto(productos) {

    function buscarProducto(codigo) {
        return productos.find((p) => p.codigo === codigo);
    }

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

    async function agregarAlCarrito(codigo) {
        const producto = buscarProducto(codigo);
        if (!producto) return;

        // El carrito está en la base de datos: para usarlo hay que tener sesión
        if (!haySesion()) {
            window.location.href = "../Login/Inicio_Sesion.html";
            return;
        }

        try {
            await agregarProductoAlCarrito(producto);

            // El modal muestra el precio que paga este usuario (con descuento si es Duoc)
            const precio = esUsuarioDuoc() ? aplicarDescuentoDuoc(producto.precio) : producto.precio;
            setAgregado({ producto, precio });
        } catch (error) {
            window.alert(error.mensaje || "No se pudo agregar el producto al carrito.");
        }
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
