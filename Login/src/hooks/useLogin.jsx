// hooks/useLogin.jsx
// Estado y lógica del formulario de inicio de sesión. Ahora pregunta al
// backend (POST /api/v1/auth/login): si el correo y la clave son correctos,
// guarda el JWT y la sesión, y redirige a la tienda. Si fallan, el mensaje
// aparece bajo el formulario.

import { useState } from "react";
import { iniciarSesion } from "../services/usuarios.jsx";

export function useLogin() {
    const [valores, setValores] = useState({ email: "", clave: "" });
    const [error, setError] = useState("");

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    async function enviar(event) {
        event.preventDefault();
        setError("");

        const correo = valores.email.trim();
        const clave = valores.clave.trim();

        if (!correo || !clave) {
            setError("Por favor, ingresa tu correo y clave.");
            return;
        }

        try {
            const usuario = await iniciarSesion(correo, clave);
            alert(`¡Bienvenido ${usuario.nombre}!`);
            window.location.href = "../visualizacion_productos/index.html";
        } catch (error) {
            setError(error.mensaje || "Correo o clave incorrectos.");
        }
    }

    return { valores, error, cambiarCampo, enviar };
}
