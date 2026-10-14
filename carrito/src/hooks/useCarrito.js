// hooks/useCarrito.js
// Estado y lógica del carrito: ítems, total y las acciones sobre ellos
// (más, menos, eliminar, vaciar). Reemplaza a cargarCarrito(),
// aumentarCantidad(), disminuirCantidad() y eliminarDelCarrito() del
// script_carrito.js original.
//
// Usa las funciones de utils.js (leer/guardar en localStorage, descuento Duoc
// y cálculo de precios). Cada cambio actualiza la pantalla y localStorage a la vez.

import { useState, useEffect } from "react";
import { CLAVE_CARRITO, esUsuarioDuoc, leerCarrito, guardarCarrito, calcularPrecios } from "../utils.js";

export function useCarrito() {
    // El carrito vive en estado de React. Se inicializa UNA vez leyendo localStorage.
    const [carrito, setCarrito] = useState(leerCarrito);

    const esDuoc = esUsuarioDuoc();

    // Si el carrito cambia en OTRA pestaña (por ejemplo agregas algo en la tienda),
    // el navegador avisa con el evento "storage" y se refresca acá. Sin esto,
    // esta pestaña podría pisar con datos viejos lo que agregaste en la tienda.
    useEffect(() => {
        function alCambiarStorage(e) {
            if (e.key === CLAVE_CARRITO || e.key === null) {
                setCarrito(leerCarrito());
            }
        }
        window.addEventListener("storage", alCambiarStorage);
        return () => window.removeEventListener("storage", alCambiarStorage);
    }, []);

    // Cada ítem con sus precios ya calculados, para que los componentes solo
    // tengan que dibujarlos. (Esto NO se guarda en localStorage.)
    const items = carrito.map((producto) => {
        const { precioBase, precioFinal } = calcularPrecios(producto, esDuoc);
        return { ...producto, precioBase, precioFinal, subtotal: precioFinal * producto.cantidad };
    });

    // El total NO es un estado aparte: se calcula en cada render, así nunca
    // puede quedar desincronizado.
    const total = items.reduce((acumulado, item) => acumulado + item.subtotal, 0);

    // Actualiza la pantalla (estado) y guarda en localStorage en un solo paso
    function actualizar(nuevoCarrito) {
        setCarrito(nuevoCarrito);
        guardarCarrito(nuevoCarrito);
    }

    function aumentarCantidad(codigo) {
        actualizar(carrito.map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad + 1 } : p)));
    }

    function eliminarDelCarrito(codigo) {
        actualizar(carrito.filter((p) => p.codigo !== codigo));
    }

    function disminuirCantidad(codigo) {
        const producto = carrito.find((p) => p.codigo === codigo);
        if (!producto) return;
        // Igual que antes: si queda 1 y aprietas "-", se elimina del carrito
        if (producto.cantidad > 1) {
            actualizar(carrito.map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad - 1 } : p)));
        } else {
            eliminarDelCarrito(codigo);
        }
    }

    // Borra el carrito de localStorage y de la pantalla
    function limpiarCarrito() {
        localStorage.removeItem(CLAVE_CARRITO);
        setCarrito([]);
    }

    return {
        items,
        total,
        esDuoc,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito
    };
}
