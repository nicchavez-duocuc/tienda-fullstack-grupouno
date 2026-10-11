// mainRegister.jsx
// Busca #react-register-root en registrar.html y monta ahí RegistroPage.

import React from "react";
import ReactDOM from "react-dom/client";
import RegistroPage from "./pages/RegistroPage.jsx";

const contenedor = document.getElementById("react-register-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <RegistroPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-register-root" en registrar.html.');
}
