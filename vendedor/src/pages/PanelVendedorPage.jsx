import { useEffect, useMemo, useState } from "react";
import {
    peticionVendedor,
    ErrorSesionVendedor,
    redirigirLoginVendedor,
    obtenerTokenVendedor,
    obtenerUsuarioVendedor,
    cerrarSesionVendedor
} from "../VendedorApi.jsx";

const FORMULARIO_VENDEDOR_VACIO = {
    codigo: "",
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
    estado: "DISPONIBLE"
};

export default function PanelVendedorPage() {
    const [usuario, setUsuario] = useState(null);
    const [pestana, setPestana] = useState("productos");
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [editCodigo, setEditCodigo] = useState(null);
    const [formulario, setFormulario] = useState(FORMULARIO_VENDEDOR_VACIO);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = obtenerTokenVendedor();
        const user = obtenerUsuarioVendedor();

        if (!token || !user || (user.rol !== "VENDEDOR" && user.rol !== "ADMIN")) {
            redirigirLoginVendedor("Acceso restringido. Inicia sesión con una cuenta de rol VENDEDOR.");
            return;
        }

        setUsuario(user);
        cargarDatosVendedor(user.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function cargarDatosVendedor(idVendedor) {
        const [resProd, resCat, resVentas] = await Promise.allSettled([
            peticionVendedor(`/productos/vendedor/${idVendedor}`),
            peticionVendedor("/categorias"),
            peticionVendedor(`/pedidos/vendedor/${idVendedor}`)
        ]);

        for (const res of [resProd, resCat, resVentas]) {
            if (res.status === "rejected" && res.reason instanceof ErrorSesionVendedor) {
                redirigirLoginVendedor("Tu sesión expiró o tu rol ya no tiene permisos de VENDEDOR.");
                return;
            }
        }

        if (resProd.status === "fulfilled") {
            setProductos(resProd.value || []);
        }

        if (resCat.status === "fulfilled") {
            setCategorias(resCat.value || []);
        } else {
            setError("Error cargando categorías: " + (resCat.reason?.message || ""));
        }

        if (resVentas.status === "fulfilled") {
            setVentas(resVentas.value || []);
        }
    }

    const productosFiltrados = useMemo(() => {
        const q = filtro.toLowerCase();
        return productos.filter(
            (p) => p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q)
        );
    }, [productos, filtro]);

    const ventasFiltradas = useMemo(() => {
        const q = filtro.toLowerCase();
        return ventas.filter(
            (v) =>
                v.productoNombre.toLowerCase().includes(q) ||
                v.compradorNombre.toLowerCase().includes(q) ||
                v.compradorCorreo.toLowerCase().includes(q)
        );
    }, [ventas, filtro]);

    const totalIngresos = useMemo(() => {
        return ventas.reduce((acc, v) => acc + Number(v.precioUnitario) * Number(v.cantidad), 0);
    }, [ventas]);

    const opcionesCategoria = useMemo(() => {
        const nombres = categorias
            .map((c) => (typeof c === "string" ? c : c.nombre))
            .filter(Boolean);
        if (formulario.categoria && !nombres.includes(formulario.categoria)) {
            nombres.unshift(formulario.categoria);
        }
        return nombres;
    }, [categorias, formulario.categoria]);

    async function cambiarEstadoProducto(codigo, nuevoEstado) {
        if (!usuario) return;
        try {
            await peticionVendedor(
                `/productos/${codigo}/estado?idVendedor=${usuario.id}&estado=${encodeURIComponent(nuevoEstado)}`,
                { method: "PUT" }
            );
            setProductos((prev) =>
                prev.map((p) => (p.codigo === codigo ? { ...p, estado: nuevoEstado } : p))
            );
        } catch (e) {
            if (e instanceof ErrorSesionVendedor) {
                redirigirLoginVendedor("Tu cuenta ya no tiene rol VENDEDOR.");
                return;
            }
            alert("No se pudo cambiar el estado: " + (e?.message || "Error inesperado"));
        }
    }

    function abrirNuevoProducto() {
        setEditCodigo(null);
        setFormulario(FORMULARIO_VENDEDOR_VACIO);
        setError("");
        setModalAbierto(true);
    }

    function abrirEditarProducto(producto) {
        setEditCodigo(producto.codigo);
        setFormulario({
            codigo: producto.codigo,
            nombre: producto.nombre,
            categoria: producto.categoria ? producto.categoria.nombre : "",
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            descripcion: producto.descripcion || "",
            estado: producto.estado || "DISPONIBLE"
        });
        setError("");
        setModalAbierto(true);
    }

    function cerrarModalProducto() {
        setModalAbierto(false);
        setEditCodigo(null);
        setFormulario(FORMULARIO_VENDEDOR_VACIO);
        setError("");
    }

    async function guardarProductoVendedor(event) {
        event.preventDefault();
        if (!usuario) return;

        const payload = {
            codigo: formulario.codigo.trim(),
            nombre: formulario.nombre.trim(),
            categoria: { nombre: formulario.categoria.trim() },
            precio: Number(formulario.precio),
            stock: Number(formulario.stock),
            imagen: formulario.imagen.trim(),
            descripcion: formulario.descripcion.trim(),
            idVendedor: usuario.id,
            estado: formulario.estado
        };

        try {
            await peticionVendedor(`/productos${editCodigo ? "/" + editCodigo : ""}`, {
                method: editCodigo ? "PUT" : "POST",
                body: JSON.stringify(payload)
            });
            await cargarDatosVendedor(usuario.id);
            cerrarModalProducto();
        } catch (e) {
            if (e instanceof ErrorSesionVendedor) {
                redirigirLoginVendedor();
                return;
            }
            setError(e?.message || "No se pudo guardar el producto.");
        }
    }

    function claseBadgeEstado(estado) {
        if (estado === "PAUSADO") return "badge badge-pausado";
        if (estado === "AGOTADO") return "badge badge-agotado";
        return "badge badge-disponible";
    }

    if (!usuario) return null;

    return (
        <>
            <div className="container">
                <div className="topbar">
                    <div>
                        <h1>Panel de Vendedor</h1>
                        <small>
                            Conectado como <b>{usuario.apodo || usuario.nombre}</b> ({usuario.correo}) — Rol:{" "}
                            <b>{usuario.rol}</b>
                        </small>
                    </div>
                    <div className="topbar-actions">
                        <button
                            className="btn btn-secondary"
                            onClick={() => (window.location.href = "../visualizacion_productos/index.html")}
                        >
                            Ir a la Tienda
                        </button>
                        <button className="btn btn-danger" onClick={cerrarSesionVendedor}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Tarjetas de resumen rápido */}
                <div className="resumen-grid">
                    <div className="resumen-card">
                        <span>Mis Productos Publicados</span>
                        <strong>{productos.length}</strong>
                    </div>
                    <div className="resumen-card">
                        <span>Ventas Realizadas</span>
                        <strong>{ventas.length}</strong>
                    </div>
                    <div className="resumen-card">
                        <span>Ingresos Totales</span>
                        <strong>${totalIngresos.toLocaleString("es-CL")}</strong>
                    </div>
                </div>

                {/* Navegación por pestañas */}
                <div className="tabs">
                    <button
                        className={`tab-btn ${pestana === "productos" ? "active" : ""}`}
                        onClick={() => {
                            setPestana("productos");
                            setFiltro("");
                        }}
                    >
                        Mis Productos ({productos.length})
                    </button>
                    <button
                        className={`tab-btn ${pestana === "ventas" ? "active" : ""}`}
                        onClick={() => {
                            setPestana("ventas");
                            setFiltro("");
                        }}
                    >
                        Quién Compró Mis Productos ({ventas.length})
                    </button>
                </div>

                {error && <p style={{ color: "#dc3545", fontWeight: "bold" }}>{error}</p>}

                {/* Barra de búsqueda y botón publicar */}
                <div
                    style={{
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <input
                        type="text"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        placeholder={
                            pestana === "productos"
                                ? "Buscar en mis productos por nombre o código..."
                                : "Buscar por producto, cliente o correo..."
                        }
                        style={{ width: "350px", margin: 0 }}
                    />
                    {pestana === "productos" && (
                        <button className="btn" onClick={abrirNuevoProducto}>
                            + Publicar Producto
                        </button>
                    )}
                </div>

                {/* PESTAÑA 1: INVENTARIO DEL VENDEDOR */}
                {pestana === "productos" && (
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado Actual</th>
                                <th>Cambiar Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                                        No tienes productos registrados todavía.
                                    </td>
                                </tr>
                            ) : (
                                productosFiltrados.map((p) => (
                                    <tr key={p.codigo}>
                                        <td>
                                            <b>{p.codigo}</b>
                                        </td>
                                        <td>
                                            <img
                                                src={p.imagen}
                                                alt={p.nombre}
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://via.placeholder.com/45";
                                                }}
                                            />
                                        </td>
                                        <td>{p.nombre}</td>
                                        <td>{p.categoria ? p.categoria.nombre : "-"}</td>
                                        <td>${Number(p.precio).toLocaleString("es-CL")}</td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <span className={claseBadgeEstado(p.estado)}>
                                                {p.estado || "DISPONIBLE"}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="select-estado"
                                                value={p.estado || "DISPONIBLE"}
                                                onChange={(e) => cambiarEstadoProducto(p.codigo, e.target.value)}
                                            >
                                                <option value="DISPONIBLE">DISPONIBLE</option>
                                                <option value="PAUSADO">PAUSADO</option>
                                                <option value="AGOTADO">AGOTADO</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button className="btn btn-edit" onClick={() => abrirEditarProducto(p)}>
                                                    Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}

                {/* PESTAÑA 2: HISTORIAL DE COMPRADORES */}
                {pestana === "ventas" && (
                    <table>
                        <thead>
                            <tr>
                                <th>Pedido #</th>
                                <th>Fecha</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Comprador</th>
                                <th>Correo Comprador</th>
                                <th>Estado Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                                        Aún no registras ventas de tus productos.
                                    </td>
                                </tr>
                            ) : (
                                ventasFiltradas.map((v, idx) => (
                                    <tr key={`${v.pedidoId}-${v.productoCodigo}-${idx}`}>
                                        <td>
                                            <b>#{v.pedidoId}</b>
                                        </td>
                                        <td>{new Date(v.fechaCompra).toLocaleString("es-CL")}</td>
                                        <td>
                                            {v.productoNombre} <small>({v.productoCodigo})</small>
                                        </td>
                                        <td>{v.cantidad}</td>
                                        <td>
                                            <b>
                                                $
                                                {(Number(v.precioUnitario) * Number(v.cantidad)).toLocaleString(
                                                    "es-CL"
                                                )}
                                            </b>
                                        </td>
                                        <td>{v.compradorNombre}</td>
                                        <td>{v.compradorCorreo}</td>
                                        <td>{v.estadoPedido}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODAL CREAR / EDITAR PRODUCTO */}
            <div className="modal" style={{ display: modalAbierto ? "flex" : "none" }}>
                <div className="modal-content">
                    <h3>{editCodigo ? "Editar Mi Producto" : "Publicar Nuevo Producto"}</h3>
                    <form onSubmit={guardarProductoVendedor}>
                        <label>Código:</label>
                        <input
                            type="text"
                            required
                            placeholder="Ej: P050"
                            value={formulario.codigo}
                            onChange={(e) => setFormulario({ ...formulario, codigo: e.target.value })}
                            disabled={Boolean(editCodigo)}
                        />

                        <label>Nombre:</label>
                        <input
                            type="text"
                            required
                            value={formulario.nombre}
                            onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                        />

                        <label>Categoría:</label>
                        <select
                            required
                            value={formulario.categoria}
                            onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}
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
                            required
                            min="0"
                            value={formulario.precio}
                            onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
                        />

                        <label>Stock:</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={formulario.stock}
                            onChange={(e) => setFormulario({ ...formulario, stock: e.target.value })}
                        />

                        <label>Estado Inicial:</label>
                        <select
                            value={formulario.estado}
                            onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}
                        >
                            <option value="DISPONIBLE">DISPONIBLE</option>
                            <option value="PAUSADO">PAUSADO</option>
                            <option value="AGOTADO">AGOTADO</option>
                        </select>

                        <label>URL Imagen:</label>
                        <input
                            type="url"
                            required
                            value={formulario.imagen}
                            onChange={(e) => setFormulario({ ...formulario, imagen: e.target.value })}
                        />

                        <label>Descripción:</label>
                        <textarea
                            rows="3"
                            value={formulario.descripcion}
                            onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                        />

                        {error && <p style={{ color: "#dc3545" }}>{error}</p>}

                        <div style={{ textAlign: "right" }}>
                            <button type="button" className="btn btn-danger" onClick={cerrarModalProducto}>
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