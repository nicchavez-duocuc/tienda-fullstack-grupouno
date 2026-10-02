
import React from "react";
import ReactDOM from "react-dom/client";
import RegisterForm from "./RegisterForm.jsx";

const contenedor = document.getElementById("react-register-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <RegisterForm />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-register-root" en registrar.html.');
}
