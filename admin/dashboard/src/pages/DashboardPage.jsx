// admin/dashboard/src/pages/DashboardPage.jsx
// Página principal del panel ADMIN. Carga las métricas desde
// GET /api/v1/dashboard -> { productos, categorias, usuarios, pedidos }.

import { useEffect, useState } from "react";
import { pedir, ErrorSesion, enviarAlLogin, mensajeDeError } from "../../../comun/api.jsx";

export default function DashboardPage() {
    const [metricas, setMetricas] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let montado = true;

        pedir("/dashboard")
            .then((datos) => {
                if (montado) setMetricas(datos);
            })
            .catch((e) => {
                if (e instanceof ErrorSesion) {
                    enviarAlLogin();
                    return;
                }
                if (montado) setError(mensajeDeError(e));
            });

        return () => {
            montado = false;
        };
    }, []);

    function valor(clave) {
        return metricas && metricas[clave] != null ? metricas[clave] : "-";
    }

    return (
        <div className="container">
            <h1>Dashboard Principal • Panel Admin</h1>
            <p>
                Bienvenido al sistema de administración centralizado de la tienda gamer. Desde aquí puedes
                gestionar de forma rápida las distintas secciones del proyecto.
            </p>

            {error && <p style={{ color: "#dc3545", fontWeight: "bold" }}>{error}</p>}

            {/* Barra de resumen rápido de datos */}
            <div className="stats-bar">
                <div className="stat-item">
                    <span id="stat-productos">{valor("productos")}</span>
                    <label>Productos Activos</label>
                </div>
                <div className="stat-item">
                    <span id="stat-categorias">{valor("categorias")}</span>
                    <label>Categorías</label>
                </div>
                <div className="stat-item">
                    <span id="stat-usuarios">{valor("usuarios")}</span>
                    <label>Usuarios Registrados</label>
                </div>
            </div>

            {/* Tarjetas con los enlaces a cada panel */}
            <div className="grid">
                <a href="../productos/index.html" className="card">
                    <div>
                        <h3>📦 Productos</h3>
                        <p>
                            Administra el inventario del catálogo, precios, stock, descripciones e imágenes de
                            los artículos gamer.
                        </p>
                    </div>
                    <span className="btn-link">Gestionar Productos</span>
                </a>

                <a href="../categorias/index.html" className="card">
                    <div>
                        <h3>🏷️ Categorías</h3>
                        <p>
                            Agrega, edita o elimina las categorías oficiales disponibles para clasificar el
                            inventario de la tienda.
                        </p>
                    </div>
                    <span className="btn-link">Gestionar Categorías</span>
                </a>

                <a href="../usuarios/index.html" className="card">
                    <div>
                        <h3>👥 Usuarios</h3>
                        <p>
                            Visualiza y administra las cuentas de usuarios registrados, roles y control de
                            accesos al sistema.
                        </p>
                    </div>
                    <span className="btn-link">Gestionar Usuarios</span>
                </a>
            </div>
        </div>
    );
}
