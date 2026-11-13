// admin/productos/src/main.jsx
// Punto de entrada de React para el CRUD de productos del panel ADMIN.

import React from "react";
import ReactDOM from "react-dom/client";
import ProductosPage from "./pages/ProductosPage.jsx";

const contenedor = document.getElementById("react-admin-productos-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <ProductosPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-admin-productos-root" en admin/productos/index.html.');
}
