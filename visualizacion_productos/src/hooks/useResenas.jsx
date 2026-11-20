// hooks/useResenas.jsx
// Estado y lógica del sistema de reseñas: lista publicada y formulario.
// Las reseñas vienen del backend (GET /api/v1/resenas) y cada una tiene
// AUTORÍA: la completa el servidor con el usuario del token (el campo
// "nombre" del formulario se mantiene pero el backend usa el apodo real).

import { useState, useEffect } from "react";
import { peticion, haySesion } from "../services/api.jsx";
import { OPCIONES_PUNTUACION } from "../services/resenas.jsx";

const VALORES_INICIALES = { producto: "", nombre: "", puntuacion: "5", comentario: "" };

export function useResenas() {
    const [resenas, setResenas] = useState([]);
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [opcionesProducto, setOpcionesProducto] = useState([]);
    const [error, setError] = useState("");

    // Carga el listado de reseñas y las opciones del selector de productos
    useEffect(() => {
        async function cargar() {
            try {
                const [resenasApi, productosApi] = await Promise.all([
                    peticion("/resenas"),
                    peticion("/productos")
                ]);
                setResenas(resenasApi);
                setOpcionesProducto([
                    { valor: "", texto: "Selecciona un producto..." },
                    ...productosApi.map((producto) => ({ valor: producto.codigo, texto: producto.nombre }))
                ]);
                setError("");
            } catch (error) {
                console.error("No se pudieron cargar las reseñas:", error.mensaje || error);
                // Avisar en pantalla: sin esto la sección mostraba "Aún no hay
                // reseñas" (falso) y el formulario quedaba sin opciones de producto
                setError("No se pudieron cargar las reseñas desde el servidor. Recarga la página o verifica que el backend esté corriendo.");
            }
        }
        cargar();
    }, []);

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    async function enviar(event) {
        event.preventDefault();

        // Escribir una reseña necesita un usuario con sesión (llena el backend
        // el apodo y la fecha). Sin sesión, se va a iniciar sesión
        if (!haySesion()) {
            window.location.href = "../Login/Inicio_Sesion.html";
            return;
        }

        try {
            // El producto se identifica por su codigo (P001, P002...)
            const nueva = await peticion("/resenas", {
                metodo: "POST",
                cuerpo: {
                    producto: valores.producto,
                    puntuacion: parseInt(valores.puntuacion, 10),
                    comentario: valores.comentario
                }
            });

            // La reseña nueva va al principio (igual que antes)
            setResenas((anteriores) => [nueva, ...anteriores]);
            setValores(VALORES_INICIALES); // limpia el formulario
        } catch (error) {
            window.alert(error.mensaje || "No se pudo publicar la reseña.");
        }
    }

    return {
        resenas,
        valores,
        opcionesProducto,
        opcionesPuntuacion: OPCIONES_PUNTUACION,
        error,
        cambiarCampo,
        enviar
    };
}
