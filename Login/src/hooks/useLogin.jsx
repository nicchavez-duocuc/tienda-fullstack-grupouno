// hooks/useLogin.jsx
// Estado y lógica del formulario de inicio de sesión. Ahora valida las
// credenciales contra el backend (POST /api/v1/auth/login), guarda el token
// JWT y los datos del usuario, y redirige según el rol de la cuenta.

import { useState } from "react";
import { iniciarSesionBackend, guardarSesion } from "../services/api.jsx";

export function useLogin() {
    const [valores, setValores] = useState({ email: "", clave: "" });
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

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

        setCargando(true);

        try {
            const sesion = await iniciarSesionBackend(correo, clave);
            guardarSesion(sesion);

            const usuario = sesion.usuario || {};
            const nombre = usuario.apodo || usuario.nombre || "Gamer";

            alert(`¡Bienvenido ${nombre}!`);

            // El ADMIN entra directo al panel; los demás vuelven a la tienda.
            if (usuario.rol === "ADMIN") {
                window.location.href = "../admin/dashboard/index.html";
            } else {
                window.location.href = "../visualizacion_productos/index.html";
            }
        } catch (e) {
            setError(e?.message || "No se pudo iniciar sesión.");
        } finally {
            setCargando(false);
        }
    }

    return { valores, error, cargando, cambiarCampo, enviar };
}
