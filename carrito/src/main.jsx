// Busca #react-carrito-root en carrito.html y monta ahí la página del carrito.

import React from "react";
import ReactDOM from "react-dom/client";
import CarritoPage from "./pages/CarritoPage.jsx";

const contenedor = document.getElementById("react-carrito-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <CarritoPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-carrito-root" en carrito.html.');
}
