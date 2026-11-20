// main.jsx
// Punto de entrada de React para perfil.html. Busca el div #react-perfil-root
// y monta ahí la página completa (título, tarjeta, formulario y enlace).

import React from "react";
import ReactDOM from "react-dom/client";
import PerfilPage from "./pages/PerfilPage.jsx";

const contenedor = document.getElementById("react-perfil-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <PerfilPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-perfil-root" en perfil.html.');
}
