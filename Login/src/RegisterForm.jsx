// Reemplaza el bloque "2. LÓGICA DE REGISTRO" de usuarios.js y el
// <form id="register-form"> de registrar.html.
//
// Mismo cambio que en LoginForm: los 3 alert() de validación (campos vacíos,
// menor de edad, términos sin aceptar) ahora se muestran como un mensaje bajo
// el formulario en vez de una ventana emergente. El alert() de "cuenta creada
// con éxito" se dejó igual, justo antes de redirigir.

import { useState } from "react";
import { registrarUsuario, calcularEdad } from "./usuariosUtils.js";

export default function RegisterForm() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fecha, setFecha] = useState("");
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [terminosAceptados, setTerminosAceptados] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const nombreTrim = nombre.trim();
        const apellidoTrim = apellido.trim();
        const correoTrim = correo.trim();
        const claveTrim = clave.trim();

        if (!nombreTrim || !apellidoTrim || !fecha || !correoTrim || !claveTrim) {
            setError("Por favor, completa todos los campos del registro.");
            return;
        }

        if (calcularEdad(fecha) < 18) {
            setError("Debe ser mayor de 18 años para poder crear la cuenta.");
            return;
        }

        if (!terminosAceptados) {
            setError("Debes aceptar los términos y condiciones.");
            return;
        }

        registrarUsuario({
            nombre: nombreTrim,
            apellido: apellidoTrim,
            fecha,
            correo: correoTrim,
            clave: claveTrim
        });

        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        window.location.href = "Inicio_Sesion.html";
    }

    return (
        <form id="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder=" juan Pablo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    placeholder="Perez"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="fecha">Fecha de Nacimiento</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="Gmail">Gmail</label>
                <input
                    type="email"
                    id="Gmail"
                    name="Gmail"
                    placeholder="juan_pablo@gmail.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
            </div>

            <div className="register-form">
                <label htmlFor="clave">Crear Clave</label>
                <input
                    type="password"
                    id="clave"
                    name="clave"
                    placeholder="********"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    required
                />
            </div>

            <div className="input-group-checkbox">
                <input
                    type="checkbox"
                    id="terms"
                    checked={terminosAceptados}
                    onChange={(e) => setTerminosAceptados(e.target.checked)}
                    required
                />
                <label htmlFor="terms">Acepto los Terminos y Condiciones</label>
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

            <button type="submit" id="btn-registrar">
                Crear Cuenta
            </button>
        </form>
    );
}
