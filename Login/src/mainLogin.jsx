// mainLogin.jsx
// Busca #react-login-root en Inicio_Sesion.html y monta ahí LoginPage.

import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.jsx";

const contenedor = document.getElementById("react-login-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <LoginPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-login-root" en Inicio_Sesion.html.');
}
