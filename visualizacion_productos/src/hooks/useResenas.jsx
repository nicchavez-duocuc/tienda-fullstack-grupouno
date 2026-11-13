// hooks/useResenas.jsx
// Estado y lógica del sistema de reseñas: lista publicada y formulario.
// El selector de productos se llena desde el backend para incluir también los
// productos nuevos creados en el panel ADMIN.

import { useState, useEffect } from "react";
import { productos as productosRespaldo } from "../productos.js";
import { cargarProductos } from "../services/catalogo.jsx";
import { leerResenas, guardarResena, OPCIONES_PUNTUACION } from "../services/resenas.jsx";

const VALORES_INICIALES = { producto: "", nombre: "", puntuacion: "5", comentario: "" };
const OPCION_VACIA = { valor: "", texto: "Selecciona un producto..." };

function opcionesDesde(productos) {
    return [OPCION_VACIA, ...productos.map((producto) => ({ valor: producto.nombre, texto: producto.nombre }))];
}

export function useResenas() {
    const [resenas, setResenas] = useState(leerResenas);
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [opcionesProducto, setOpcionesProducto] = useState([OPCION_VACIA]);

    // Carga los productos del backend para el selector (con respaldo local)
    useEffect(() => {
        let activo = true;

        cargarProductos()
            .then((lista) => {
                if (activo) setOpcionesProducto(opcionesDesde(lista));
            })
            .catch(() => {
                if (activo) setOpcionesProducto(opcionesDesde(productosRespaldo));
            });

        return () => {
            activo = false;
        };
    }, []);

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
        opcionesProducto,
        opcionesPuntuacion: OPCIONES_PUNTUACION,
        cambiarCampo,
        enviar
    };
}
