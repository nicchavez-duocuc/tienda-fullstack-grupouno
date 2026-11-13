// admin/dashboard/src/main.jsx
// Punto de entrada de React para el dashboard del panel de administración.

import React from "react";
import ReactDOM from "react-dom/client";
import DashboardPage from "./pages/DashboardPage.jsx";

const contenedor = document.getElementById("react-admin-dashboard-root");

if (contenedor) {
    ReactDOM.createRoot(contenedor).render(
        <React.StrictMode>
            <DashboardPage />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento "#react-admin-dashboard-root" en admin/dashboard/index.html.');
}
