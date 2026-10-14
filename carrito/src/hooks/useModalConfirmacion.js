// hooks/useModalConfirmacion.js
// Estado del modal. Reemplaza a abrirModalConfirmacion(), cerrarModalConfirmacion(),
// ejecutarAccion() y a la variable global "accionPendiente" del script original.
// null = modal cerrado; un objeto = modal abierto con esa configuración
// (mensaje, icono, colores, acción a ejecutar al confirmar, etc.).

import { useState } from "react";

export function useModalConfirmacion() {
    const [modal, setModal] = useState(null);

    function abrirModal(config) {
        setModal(config);
    }

    function cerrarModal() {
        setModal(null);
    }

    function confirmarModal() {
        const accion = modal ? modal.accion : null;
        // Primero se cierra y DESPUÉS se ejecuta la acción: así, si la acción
        // abre otro modal (el de "Pago exitoso"), ese es el que queda visible.
        cerrarModal();
        if (accion) accion();
    }

    return { modal, abrirModal, cerrarModal, confirmarModal };
}
