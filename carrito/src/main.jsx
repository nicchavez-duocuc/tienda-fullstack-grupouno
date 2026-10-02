// Busca #react-carrito-root en carrito.html y monta ahí el componente Carrito.

import React from "react";
import ReactDOM from "react-dom/client";
import Carrito from "./Carrito.jsx";

const contenedor = document.getElementById("react-carrito-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <Carrito />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-carrito-root" en carrito.html.');
}
