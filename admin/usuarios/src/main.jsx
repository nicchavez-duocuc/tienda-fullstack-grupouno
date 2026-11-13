// admin/usuarios/src/main.jsx
// Punto de entrada de React para el panel de usuarios del panel ADMIN.

import React from "react";
import ReactDOM from "react-dom/client";
import UsuariosPage from "./pages/UsuariosPage.jsx";

const contenedor = document.getElementById("react-admin-usuarios-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <UsuariosPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-admin-usuarios-root" en admin/usuarios/index.html.');
}
