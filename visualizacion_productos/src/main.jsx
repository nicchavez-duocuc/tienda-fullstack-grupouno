// main.jsx
// Punto de entrada de React para esta página. Busca el div
// #react-productos-root que está en index.html y monta ahí TiendaPage.

import React from "react";
import ReactDOM from "react-dom/client";
import TiendaPage from "./pages/TiendaPage.jsx";

const contenedor = document.getElementById("react-productos-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <TiendaPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-productos-root" en el HTML.');
}
