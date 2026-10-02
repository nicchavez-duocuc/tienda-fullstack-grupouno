// Reemplaza el bloque "1. LÓGICA DE LOGIN" de usuarios.js y el <form id="login-form">
// de Inicio_Sesion.html.
//
// Único cambio de comportamiento respecto al original: cuando el correo o la
// clave son incorrectos, en vez de un alert() que bloquea la pantalla, el
// mensaje aparece bajo el formulario y se puede corregir al toque.
import { useState } from "react";
import { iniciarSesion, CLAVE_USUARIO_ACTIVO } from "./usuariosUtils.js";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const correo = email.trim();
        const password = clave.trim();

        if (!correo || !password) {
            setError("Por favor, ingresa tu correo y clave.");
            return;
        }

        const usuario = iniciarSesion(correo, password);

        if (usuario) {
            localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(usuario));
            alert(`¡Bienvenido ${usuario.nombre}!`);
            window.location.href = "../visualizacion_productos/index.html";
        } else {
            setError("Correo o clave incorrectos.");
        }
    }

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="email">Gmail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tucorreo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="clave">Clave</label>
                <input
                    type="password"
                    id="clave"
                    name="clave"
                    placeholder="*********"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    required
                />
            </div>

            {error && (
                <p
                    style={{
                        color: "#ff5555",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        marginBottom: 15
                    }}
                >
                    {error}
                </p>
            )}

            <button type="submit" id="btn-submit">
                Iniciar Sesion
            </button>
        </form>
    );
}
