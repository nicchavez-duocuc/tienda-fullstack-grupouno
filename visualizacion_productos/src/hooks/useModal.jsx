// hooks/useModal.jsx
// Un modal sencillo que solo se abre y se cierra (por ejemplo el del mapa).
// Reemplaza a abrirModalImagen() y cerrarModalImagen() de Script.js.

import { useState } from "react";

export function useModal() {
    const [abierto, setAbierto] = useState(false);

    function abrir() {
        setAbierto(true);
    }

    function cerrar() {
        setAbierto(false);
    }

    return { abierto, abrir, cerrar };
}
