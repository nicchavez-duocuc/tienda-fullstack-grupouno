// admin/usuarios/src/pages/UsuariosPage.jsx
// Panel de usuarios: CRUD sobre GET/PUT/DELETE /api/v1/usuarios (solo ADMIN).
// El historial de compras sale de GET /api/v1/usuarios/{id}/pedidos, que
// devuelve los pedidos PAGADOS del usuario con sus detalles.

import { useEffect, useState } from "react";
import { pedir, ErrorSesion, enviarAlLogin, mensajeDeError } from "../../../comun/api.jsx";

function avatarDe(usuario) {
    if (usuario && usuario.avatar) return usuario.avatar;
    const nombre = (usuario && (usuario.apodo || usuario.nombre)) || "Gamer";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=1E90FF&color=fff`;
}

function fechaLegible(fecha) {
    return fecha ? fecha.replace("T", " ").slice(0, 16) : "Fecha desconocida";
}

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [idSeleccionado, setIdSeleccionado] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [apodo, setApodo] = useState("");
    const [clave, setClave] = useState("");
    const [rol, setRol] = useState("");
    const [error, setError] = useState("");

    async function cargarUsuarios() {
        try {
            const lista = await pedir("/usuarios");
            setUsuarios(lista || []);
            setError("");
            return lista || [];
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return [];
            }
            setError(mensajeDeError(e));
            return [];
        }
    }

    useEffect(() => {
        cargarUsuarios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function verDatos() {
        const id = Number(idSeleccionado);
        if (!id) {
            alert("Por favor selecciona un usuario de la lista.");
            return;
        }

        try {
            const datos = await pedir("/usuarios/" + id);
            const compras = await pedir("/usuarios/" + id + "/pedidos");

            setUsuario(datos);
            setHistorial(compras || []);
            setApodo(datos.apodo || datos.nombre || "");
            setClave("");
            setRol("");
            setError("");
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return;
            }
            setError(mensajeDeError(e));
        }
    }

    async function actualizar(event) {
        event.preventDefault();
        const id = Number(idSeleccionado);
        if (!id) return;

        const cambios = { apodo: apodo.trim() };
        if (clave.trim()) cambios.clave = clave.trim();
        if (rol) cambios.rol = rol;

        try {
            const actualizado = await pedir("/usuarios/" + id, {
                method: "PUT",
                body: JSON.stringify(cambios)
            });

            setUsuario(actualizado);
            setClave("");
            setRol("");
            await cargarUsuarios();
            alert("¡Perfil actualizado con éxito!");
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return;
            }
            setError(mensajeDeError(e));
        }
    }

    async function eliminar() {
        const id = Number(idSeleccionado);
        if (!id || !usuario) return;
        if (!confirm(`¿Estás seguro de eliminar al usuario: ${usuario.correo}?`)) return;

        try {
            await pedir("/usuarios/" + id, { method: "DELETE" });
            alert("Usuario eliminado correctamente.");
            setUsuario(null);
            setHistorial([]);
            setIdSeleccionado("");
            await cargarUsuarios();
        } catch (e) {
            if (e instanceof ErrorSesion) {
                enviarAlLogin();
                return;
            }
            setError(mensajeDeError(e));
        }
    }

    return (
        <div className="container">
            <h2>Panel de Administración - Historial de Compras</h2>

            {error && <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>{error}</p>}

            <div className="grid">
                {/* Columna Izquierda: Lista de Usuarios */}
                <div className="column">
                    <h3>1. Seleccionar Usuario</h3>
                    <label htmlFor="lista-usuarios">Usuarios registrados:</label>
                    <select
                        id="lista-usuarios"
                        size={12}
                        value={idSeleccionado}
                        onChange={(e) => setIdSeleccionado(e.target.value)}
                    >
                        {usuarios.length === 0 && (
                            <option value="" disabled>
                                No hay usuarios registrados
                            </option>
                        )}
                        {usuarios.map((usr) => (
                            <option key={usr.id} value={usr.id}>
                                {`${usr.apodo || usr.nombre || "Gamer"} (${usr.correo})`}
                            </option>
                        ))}
                    </select>
                    <button type="button" id="btn-cargar" onClick={verDatos}>
                        Ver Datos e Historial
                    </button>
                </div>

                {/* Columna Derecha: Panel de Edición e Historial */}
                <div className="column">
                    <h3>2. Información e Historial de Compras</h3>

                    <div id="panel-edicion" className="user-card" style={{ display: usuario ? "block" : "none" }}>
                        <img id="ver-avatar" className="avatar-preview" src={avatarDe(usuario)} alt="Avatar" />

                        <label>Correo:</label>
                        <input
                            type="email"
                            id="edit-correo"
                            disabled
                            value={usuario ? usuario.correo : ""}
                            style={{ background: "#1a1a1a", color: "#777" }}
                        />

                        <label>Apodo / Nombre:</label>
                        <input type="text" id="edit-apodo" value={apodo} onChange={(e) => setApodo(e.target.value)} />

                        <label>Nueva Contraseña (opcional):</label>
                        <input
                            type="password"
                            id="edit-clave"
                            placeholder="Dejar en blanco para no cambiar"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                        />

                        {/* Rol de la cuenta: solo el ADMIN puede cambiarlo */}
                        <label htmlFor="edit-rol">Rol:</label>
                        <select
                            id="edit-rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                background: "#111",
                                color: "#fff",
                                border: "1px solid #39FF14",
                                padding: "8px",
                                borderRadius: "4px"
                            }}
                        >
                            <option value="">(sin cambio)</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="VENDEDOR">VENDEDOR</option>
                            <option value="COMPRADOR">COMPRADOR</option>
                        </select>

                        <form onSubmit={actualizar}>
                            <button type="submit" id="btn-actualizar">
                                Actualizar Perfil (Update)
                            </button>
                        </form>
                        <button type="button" id="btn-eliminar" className="danger" onClick={eliminar}>
                            Eliminar Usuario (Delete)
                        </button>

                        <hr style={{ borderColor: "#444", margin: "15px 0" }} />

                        <h4 style={{ margin: "5px 0", color: "#39FF14" }}>📦 Historial de Compras Pagadas</h4>
                        <div id="contenedor-historial" className="history-container">
                            {historial.length === 0 ? (
                                <span style={{ color: "#888" }}>No hay compras registradas para este usuario.</span>
                            ) : (
                                historial.map((compra, index) => (
                                    <div key={compra.id} className="purchase-box">
                                        <div className="purchase-header">
                                            <span>
                                                Compra #{historial.length - index} ({fechaLegible(compra.fecha)})
                                            </span>
                                            <span>
                                                Total: ${Number(compra.total || 0).toLocaleString("es-CL")}
                                            </span>
                                        </div>
                                        {Array.isArray(compra.detalles) &&
                                            compra.detalles.map((item) => {
                                                const precioItem = item.precioUnitario || 0;
                                                const cantidadItem = item.cantidad || 1;
                                                return (
                                                    <div className="purchase-item" key={item.id}>
                                                        <span>
                                                            • {item.producto ? item.producto.nombre : ""} (x
                                                            {cantidadItem})
                                                        </span>
                                                        <span>
                                                            $
                                                            {(precioItem * cantidadItem).toLocaleString("es-CL")}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <p id="mensaje-seleccion" style={{ color: "#888", marginTop: "20px", display: usuario ? "none" : "block" }}>
                        Selecciona un usuario de la lista y presiona el botón para ver su perfil y sus
                        transacciones completadas.
                    </p>
                </div>
            </div>
        </div>
    );
}
