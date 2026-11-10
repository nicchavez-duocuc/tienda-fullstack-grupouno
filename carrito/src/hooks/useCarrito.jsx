// hooks/useCarrito.jsx
// Estado y lógica del carrito. El carrito ahora vive en el BASE DE DATOS:
// es el pedido con estado PENDIENTE del usuario autenticado. Para usar el
// carrito hay que iniciar sesión; sin sesión esta página se muestra vacía
// y los mensajes de la página mismas avisan del carrito vacío.
//
// Cada cambio (más, menos, eliminar, vaciar) se hace con una petición al
// backend y el estado de React se sincroniza con la respuesta del servidor.

import { useState, useEffect } from "react";
import { peticion, haySesion, borrarToken } from "../../../visualizacion_productos/src/services/api.jsx";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { calcularPrecios } from "../services/precios.jsx";

// Convierte un detalle del pedido en la forma de "ítem" que dibujaba la
// página: los mismos campos de antes (nombre, precio ORIGINAL, cantidad...).
export function detalleAItem(detalle) {
    return {
        ...detalle.producto,
        precio: detalle.precioUnitario,
        cantidad: detalle.cantidad
    };
}

export function useCarrito() {
    const [carrito, setCarrito] = useState([]);

    const esDuoc = esUsuarioDuoc();

    // Carga el carrito desde el backend al abrir la página
    useEffect(() => {
        if (!haySesion()) return; // sin sesión: carrito vacío
        async function cargar() {
            try {
                const pedido = await peticion("/carrito");
                setCarrito((pedido.detalles || []).map(detalleAItem));
            } catch (error) {
                console.error("No se pudo cargar el carrito:", error.mensaje || error);
            }
        }
        cargar();
    }, []);

    // Cada ítem con sus precios ya calculados, para que los componentes solo
    // tengan que dibujarlos (igual que antes).
    const items = carrito.map((producto) => {
        const { precioBase, precioFinal } = calcularPrecios(producto, esDuoc);
        return { ...producto, precioBase, precioFinal, subtotal: precioFinal * producto.cantidad };
    });

    const total = items.reduce((acumulado, item) => acumulado + item.subtotal, 0);

    // Vuelve a leer el carrito del backend después de cada cambio
    async function refrescar() {
        const pedido = await peticion("/carrito");
        setCarrito((pedido.detalles || []).map(detalleAItem));
    }

    // Ejecuta la acción del backend y sincroniza el estado
    async function actualizar(conPeticion) {
        try {
            const pedido = await conPeticion();
            setCarrito((pedido.detalles || []).map(detalleAItem));
        } catch (error) {
            window.alert(error.mensaje || "No se pudo actualizar el carrito.");
        }
    }

    function aumentarCantidad(codigo) {
        const item = carrito.find((p) => p.codigo === codigo);
        if (!item) return;
        actualizar(() => peticion("/carrito/items/" + codigo, {
            metodo: "PUT",
            cuerpo: { codigo, cantidad: item.cantidad + 1 }
        }));
    }

    function eliminarDelCarrito(codigo) {
        actualizar(() => peticion("/carrito/items/" + codigo, { metodo: "DELETE" }));
    }

    function disminuirCantidad(codigo) {
        const item = carrito.find((p) => p.codigo === codigo);
        if (!item) return;
        // Igual que antes: si queda 1 y aprietas "-", se elimina del carrito
        if (item.cantidad > 1) {
            actualizar(() => peticion("/carrito/items/" + codigo, {
                metodo: "PUT",
                cuerpo: { codigo, cantidad: item.cantidad - 1 }
            }));
        } else {
            eliminarDelCarrito(codigo);
        }
    }

    // Borra el carrito completo en la base de datos
    function limpiarCarrito() {
        actualizar(() => peticion("/carrito", { metodo: "DELETE" }));
    }

    // Acabamos con el pedido PENDIENTE: pasa a PAGADO en la base de datos (y
    // se descuenta el stock). La próxima vez el carrito comienza en cero.
    async function finalizarCompra() {
        return actualizar(() => peticion("/carrito/finalizar", { metodo: "POST" }));
    }

    return {
        items,
        total,
        esDuoc,
        sinSesion: !haySesion(),
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        limpiarCarrito,
        finalizarCompra,
        borrarToken
    };
}
