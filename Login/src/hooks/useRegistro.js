// hooks/useRegistro.js
// Estado y lógica del formulario de registro, con sus validaciones. Reemplaza
// el bloque "2. LÓGICA DE REGISTRO" de usuarios.js.
//
// Usa las funciones de usuariosUtils.js (calcular edad y guardar el usuario).
// Cambio respecto al original: los 3 alert() de validación (campos vacíos,
// menor de edad, términos sin aceptar) ahora son un mensaje bajo el formulario.
// El alert() de "cuenta creada con éxito" se dejó igual, antes de redirigir.

import { useState } from "react";
import { registrarUsuario, calcularEdad } from "../usuariosUtils.js";

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

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    function enviar(event) {
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

        registrarUsuario({ nombre, apellido, fecha: valores.fecha, correo, clave });

        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        window.location.href = "Inicio_Sesion.html";
    }

    return { valores, error, cambiarCampo, enviar };
}
