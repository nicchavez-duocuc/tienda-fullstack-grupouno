// hooks/useRegistro.jsx
// Estado y lógica del formulario de registro, con sus validaciones. Crea la
// cuenta en el backend (POST /api/v1/auth/registrar) y luego manda al login.

import { useState } from "react";
import { registrarUsuarioBackend } from "../services/api.jsx";
import { calcularEdad } from "../services/edad.jsx";

const VALORES_INICIALES = {
    nombre: "",
    apellido: "",
    fecha: "",
    correo: "",
    clave: "",
    terminos: false
};

export function useRegistro() {
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    async function enviar(event) {
        event.preventDefault();
        setError("");

        const nombre = valores.nombre.trim();
        const apellido = valores.apellido.trim();
        const correo = valores.correo.trim();
        const clave = valores.clave.trim();

        if (!nombre || !apellido || !valores.fecha || !correo || !clave) {
            setError("Por favor, completa todos los campos del registro.");
            return;
        }

        if (calcularEdad(valores.fecha) < 18) {
            setError("Debe ser mayor de 18 años para poder crear la cuenta.");
            return;
        }

        if (!valores.terminos) {
            setError("Debes aceptar los términos y condiciones.");
            return;
        }

        setCargando(true);

        try {
            await registrarUsuarioBackend({
                nombre,
                apellido,
                fecha: valores.fecha,
                correo,
                clave
            });

            alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
            window.location.href = "Inicio_Sesion.html";
        } catch (e) {
            setError(e?.message || "No se pudo crear la cuenta.");
        } finally {
            setCargando(false);
        }
    }

    return { valores, error, cargando, cambiarCampo, enviar };
}
