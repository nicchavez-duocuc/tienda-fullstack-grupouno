// hooks/useResenas.jsx
// Estado y lógica del sistema de reseñas: lista publicada y formulario.
// Reemplaza a cargarOpcionesProductosResena(), renderizarResenas() y
// guardarResena() de Script.js.

import { useState } from "react";
import { productos } from "../productos.js";
import { leerResenas, guardarResena, OPCIONES_PUNTUACION } from "../services/resenas.jsx";

const VALORES_INICIALES = { producto: "", nombre: "", puntuacion: "5", comentario: "" };

// Opciones del selector de productos: una vacía de aviso y una por producto
const OPCIONES_PRODUCTO = [
    { valor: "", texto: "Selecciona un producto..." },
    ...productos.map((producto) => ({ valor: producto.nombre, texto: producto.nombre }))
];

export function useResenas() {
    const [resenas, setResenas] = useState(leerResenas);
    const [valores, setValores] = useState(VALORES_INICIALES);

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    function enviar(event) {
        event.preventDefault();

        const nuevaResena = {
            producto: valores.producto,
            nombre: valores.nombre,
            puntuacion: parseInt(valores.puntuacion, 10),
            comentario: valores.comentario,
            fecha: new Date().toLocaleDateString("es-CL")
        };

        setResenas(guardarResena(nuevaResena));
        setValores(VALORES_INICIALES); // limpia el formulario
    }

    return {
        resenas,
        valores,
        opcionesProducto: OPCIONES_PRODUCTO,
        opcionesPuntuacion: OPCIONES_PUNTUACION,
        cambiarCampo,
        enviar
    };
}
