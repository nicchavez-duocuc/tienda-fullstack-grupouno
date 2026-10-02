// main.jsx
// Punto de entrada de React para esta página. Busca el div
// #react-productos-root que dejamos en index.html y monta ahí el
// componente ProductGrid.

import React from "react";
import ReactDOM from "react-dom/client";
import ProductGrid from "./ProductGrid.jsx";

const contenedor = document.getElementById("react-productos-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <ProductGrid />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-productos-root" en el HTML.');
}
