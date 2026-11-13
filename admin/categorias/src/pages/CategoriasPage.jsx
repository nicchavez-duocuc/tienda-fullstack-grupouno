// admin/categorias/src/pages/CategoriasPage.jsx
// CRUD de categorías contra el backend de Spring Boot:
//   GET    /api/v1/categorias       -> [{id, nombre, descripcion}]
//   POST   /api/v1/categorias
//   PUT    /api/v1/categorias/{id}
//   DELETE /api/v1/categorias/{id}
// Solo ADMIN tiene permiso.

import { useEffect, useMemo, useState } from "react";
import { pedir, ErrorSesion, enviarAlLogin, mensajeDeError } from "../../../comun/api.jsx";

export default function CategoriasPage() {
    const [categorias, setCategorias] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editId, setEditId] = useState(null);
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState("");

    async function cargarDatos() {
        try {
            const lista = await pedir("/categorias");
            setCategorias(lista || []);
            setError("");
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return;
            }
            setError(mensajeDeError(e));
        }
    }

    useEffect(() => {
        cargarDatos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtradas = useMemo(() => {
        const texto = filtro.toLowerCase();
        return categorias.filter((categoria) => categoria.nombre.toLowerCase().includes(texto));
    }, [categorias, filtro]);

    function abrirModal() {
        setEditId(null);
        setNombre("");
        setError("");
        setModalAbierto(true);
    }

    function editar(categoria) {
        setEditId(categoria.id);
        setNombre(categoria.nombre);
        setError("");
        setModalAbierto(true);
    }

    function cerrarModal() {
        setModalAbierto(false);
        setEditId(null);
        setNombre("");
    }

    async function guardar(event) {
        event.preventDefault();
        const nombreLimpio = nombre.trim();
        if (!nombreLimpio) return;

        try {
            await pedir(`/categorias${editId ? "/" + editId : ""}`, {
                method: editId ? "PUT" : "POST",
                body: JSON.stringify({ nombre: nombreLimpio, descripcion: "" })
            });
            await cargarDatos();
            cerrarModal();
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return;
            }
            setError(mensajeDeError(e));
        }
    }

    async function eliminar(categoria) {
        if (!confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) return;

        try {
            await pedir(`/categorias/${categoria.id}`, { method: "DELETE" });
            await cargarDatos();
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return;
            }
            alert("Error: " + mensajeDeError(e));
        }
    }

    return (
        <>
            <div className="container">
                <h1>Panel CRUD • Categorías Gamer</h1>
                <p>
                    Administración de categorías sincronizada con la base de datos. Las categorías se leen y
                    guardan mediante <code>/api/v1/categorias</code>.
                </p>

                {error && <p style={{ color: "#dc3545", fontWeight: "bold" }}>{error}</p>}

                <div className="header-actions">
                    <input
                        type="text"
                        id="buscador"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        placeholder="Buscar categoría..."
                        style={{ width: "300px", margin: 0 }}
                    />
                    <div>
                        <button className="btn" onClick={abrirModal}>
                            + Nueva Categoría
                        </button>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre de la Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-body">
                        {filtradas.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>
                                    <b>{categorias.indexOf(categoria) + 1}</b>
                                </td>
                                <td>{categoria.nombre}</td>
                                <td>
                                    <div className="actions">
                                        <button className="btn btn-edit" onClick={() => editar(categoria)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger" onClick={() => eliminar(categoria)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para Crear / Editar */}
            <div id="modal" className="modal" style={{ display: modalAbierto ? "flex" : "none" }}>
                <div className="modal-content">
                    <h3 id="modal-titulo">{editId ? "Editar Categoría" : "Nueva Categoría"}</h3>
                    <form id="form" onSubmit={guardar}>
                        <label>Nombre de la Categoría:</label>
                        <input
                            type="text"
                            id="nombre-categoria"
                            required
                            placeholder="Ej: Realidad Virtual"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        {error && <p style={{ color: "#dc3545" }}>{error}</p>}

                        <div style={{ textAlign: "right", marginTop: "10px" }}>
                            <button type="button" className="btn btn-danger" onClick={cerrarModal}>
                                Cancelar
                            </button>{" "}
                            <button type="submit" className="btn">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
