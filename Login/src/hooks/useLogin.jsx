// hooks/useLogin.jsx
// Estado y lógica del formulario de inicio de sesión. Reemplaza el bloque
// "1. LÓGICA DE LOGIN" de usuarios.js.
//
// Usa los servicios (buscar usuario y guardar la sesión). Cambio respecto al
// original: cuando el correo o la clave son incorrectos, en vez de un alert()
// el mensaje aparece bajo el formulario.

import { useState } from "react";
import { iniciarSesion, guardarUsuarioActivo } from "../services/usuarios.jsx";

export function useLogin() {
    const [valores, setValores] = useState({ email: "", clave: "" });
    const [error, setError] = useState("");

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    function enviar(event) {
        event.preventDefault();
        setError("");

        const correo = valores.email.trim();
        const clave = valores.clave.trim();

        if (!correo || !clave) {
            setError("Por favor, ingresa tu correo y clave.");
            return;
        }

        const usuario = iniciarSesion(correo, clave);

        if (usuario) {
            guardarUsuarioActivo(usuario);
            alert(`¡Bienvenido ${usuario.nombre}!`);
            window.location.href = "../visualizacion_productos/index.html";
        } else {
            setError("Correo o clave incorrectos.");
        }
    }

    return { valores, error, cambiarCampo, enviar };
}
