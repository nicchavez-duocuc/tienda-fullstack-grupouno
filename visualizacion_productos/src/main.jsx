// main.jsx
// Punto de entrada de React para index.html. Busca cuatro divs de la página y
// monta en cada uno su parte:
//   #react-mapa-root       -> botón "Ver Mapa" del header y su modal
//   #react-usuario-root    -> foto y apodo del usuario en el header
//   #react-productos-root  -> buscador, filtros, productos y sus modales
//   #react-resenas-root    -> reseñas y calificaciones

import React from "react";
import ReactDOM from "react-dom/client";
import MapaPage from "./pages/MapaPage.jsx";
import UsuarioHeaderPage from "./pages/UsuarioHeaderPage.jsx";
import TiendaPage from "./pages/TiendaPage.jsx";
import ResenasPage from "./pages/ResenasPage.jsx";

function montar(idContenedor, Pagina) {
    const contenedor = document.getElementById(idContenedor);

    if (!contenedor) {
        console.error(`No se encontró el elemento "#${idContenedor}" en index.html.`);
        return;
    }

    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <Pagina />
        </React.StrictMode>
    );
}

montar("react-mapa-root", MapaPage);
montar("react-usuario-root", UsuarioHeaderPage);
montar("react-productos-root", TiendaPage);
montar("react-resenas-root", ResenasPage);
