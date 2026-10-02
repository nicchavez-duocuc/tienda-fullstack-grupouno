
import React from "react";
import ReactDOM from "react-dom/client";
import LoginForm from "./LoginForm.jsx";

const contenedor = document.getElementById("react-login-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <LoginForm />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-login-root" en Inicio_Sesion.html.');
}
