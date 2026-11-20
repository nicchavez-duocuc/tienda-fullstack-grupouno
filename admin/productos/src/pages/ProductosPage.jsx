// admin/productos/src/pages/ProductosPage.jsx
// CRUD de productos contra el backend de Spring Boot:
//   GET    /api/v1/productos        (lista con categoria)
//   POST   /api/v1/productos        -> {codigo, nombre, precio, stock, imagen, descripcion, categoria:{nombre}}
//   PUT    /api/v1/productos/{codigo}
//   DELETE /api/v1/productos/{codigo}
// Solo ADMIN tiene permiso.

import { useEffect, useMemo, useState } from "react";
import { pedir, ErrorSesion, enviarAlLogin, mensajeDeError } from "../../../comun/api.jsx";

const FORMULARIO_VACIO = {
    codigo: "",
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: ""
};

export default function ProductosPage() {
    const [catalogo, setCatalogo] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editCodigo, setEditCodigo] = useState(null);
    const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
    const [error, setError] = useState("");

    async function cargarDatos() {
        try {
            // Productos del inventario y el listado de categorias ya creadas
            // (GET /api/v1/categorias): de aca sale el selector del formulario,
            // para no tener que escribir el nombre de la categoria a mano.
            const [lista, listaCategorias] = await Promise.all([
                pedir("/productos"),
                pedir("/categorias")
            ]);
            setCatalogo(lista || []);
            setCategorias(listaCategorias || []);
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

    const filtrados = useMemo(() => {
        const texto = filtro.toLowerCase();
        return catalogo.filter(
            (p) => p.nombre.toLowerCase().includes(texto) || p.codigo.toLowerCase().includes(texto)
        );
    }, [catalogo, filtro]);

    // Opciones del selector de categorias. Si se edita un producto cuya
    // categoria ya no aparece en el listado (la borraron del panel de
    // categorias), se agrega igual para que no se pierda al guardar.
    const opcionesCategoria = useMemo(() => {
        const nombres = categorias
            .map((c) => (typeof c === "string" ? c : c.nombre))
            .filter(Boolean);

        if (formulario.categoria && !nombres.includes(formulario.categoria)) {
            nombres.unshift(formulario.categoria);
        }
        return nombres;
    }, [categorias, formulario.categoria]);

    function cambiarCampo(campo, valor) {
        setFormulario((anterior) => ({ ...anterior, [campo]: valor }));
    }

    function abrirModal() {
        setEditCodigo(null);
        setFormulario(FORMULARIO_VACIO);
        setError("");
        setModalAbierto(true);
    }

    function editar(producto) {
        setEditCodigo(producto.codigo);
        setFormulario({
            codigo: producto.codigo,
            nombre: producto.nombre,
            categoria: producto.categoria ? producto.categoria.nombre : "",
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            descripcion: producto.descripcion || ""
        });
        setError("");
        setModalAbierto(true);
    }

    function cerrarModal() {
        setModalAbierto(false);
        setEditCodigo(null);
        setFormulario(FORMULARIO_VACIO);
        setError("");
    }

    async function guardar(event) {
        event.preventDefault();

        const item = {
            codigo: formulario.codigo.trim(),
            nombre: formulario.nombre.trim(),
            categoria: { nombre: formulario.categoria.trim() },
            precio: Number(formulario.precio),
            stock: Number(formulario.stock),
            imagen: formulario.imagen.trim(),
            descripcion: formulario.descripcion.trim()
        };

        try {
            await pedir(`/productos${editCodigo ? "/" + editCodigo : ""}`, {
                method: editCodigo ? "PUT" : "POST",
                body: JSON.stringify(item)
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

    async function eliminar(codigo) {
        if (!confirm(`¿Eliminar producto ${codigo}?`)) return;

        try {
            await pedir(`/productos/${codigo}`, { method: "DELETE" });
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
                <h1>Panel CRUD • Productos Gamer</h1>
                <p>
                    Inventario conectado a la base de datos mediante <code>/api/v1/productos</code>. Las
                    categorías se eligen del listado ya creado (vienen de{" "}
                    <code>/api/v1/categorias</code>); para crear una nueva, usa el panel de Categorías.
                </p>

                {error && <p style={{ color: "#dc3545", fontWeight: "bold" }}>{error}</p>}

                <div
                    style={{
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <input
                        type="text"
                        id="buscador"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        placeholder="Buscar por nombre o código..."
                        style={{ width: "300px", margin: 0 }}
                    />
                    <button className="btn" onClick={abrirModal}>
                        + Nuevo Producto
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-body">
                        {filtrados.map((p) => (
                            <tr key={p.codigo}>
                                <td>
                                    <b>{p.codigo}</b>
                                </td>
                                <td>
                                    <img
                                        src={p.imagen}
                                        alt={p.nombre}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/40";
                                        }}
                                    />
                                </td>
                                <td>{p.nombre}</td>
                                <td>{p.categoria ? p.categoria.nombre : ""}</td>
                                <td>${Number(p.precio).toLocaleString("es-CL")}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <div className="actions">
                                        <button className="btn btn-edit" onClick={() => editar(p)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger" onClick={() => eliminar(p.codigo)}>
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
                    <h3 id="modal-titulo">{editCodigo ? "Editar Producto" : "Nuevo Producto"}</h3>
                    <form id="form" onSubmit={guardar}>
                        <label>Código:</label>
                        <input
                            type="text"
                            id="codigo"
                            required
                            placeholder="Ej: P022"
                            value={formulario.codigo}
                            onChange={(e) => cambiarCampo("codigo", e.target.value)}
                            disabled={Boolean(editCodigo)}
                        />

                        <label>Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            required
                            value={formulario.nombre}
                            onChange={(e) => cambiarCampo("nombre", e.target.value)}
                        />

                        <label>Categoría:</label>
                        <select
                            id="categoria"
                            required
                            value={formulario.categoria}
                            onChange={(e) => cambiarCampo("categoria", e.target.value)}
                        >
                            <option value="" disabled>
                                Selecciona una categoría...
                            </option>
                            {opcionesCategoria.map((nombre) => (
                                <option key={nombre} value={nombre}>
                                    {nombre}
                                </option>
                            ))}
                        </select>

                        <label>Precio ($):</label>
                        <input
                            type="number"
                            id="precio"
                            required
                            min="0"
                            value={formulario.precio}
                            onChange={(e) => cambiarCampo("precio", e.target.value)}
                        />

                        <label>Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            required
                            min="0"
                            value={formulario.stock}
                            onChange={(e) => cambiarCampo("stock", e.target.value)}
                        />

                        <label>URL Imagen:</label>
                        <input
                            type="url"
                            id="imagen"
                            required
                            value={formulario.imagen}
                            onChange={(e) => cambiarCampo("imagen", e.target.value)}
                        />

                        <label>Descripción:</label>
                        <textarea
                            id="descripcion"
                            rows="3"
                            value={formulario.descripcion}
                            onChange={(e) => cambiarCampo("descripcion", e.target.value)}
                        />

                        {error && <p style={{ color: "#dc3545" }}>{error}</p>}

                        <div style={{ textAlign: "right" }}>
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
