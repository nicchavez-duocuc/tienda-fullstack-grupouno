// admin/categorias/src/main.jsx
// Punto de entrada de React para el CRUD de categorías del panel ADMIN.

import React from "react";
import ReactDOM from "react-dom/client";
import CategoriasPage from "./pages/CategoriasPage.jsx";

const contenedor = document.getElementById("react-admin-categorias-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <CategoriasPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-admin-categorias-root" en admin/categorias/index.html.');
}
