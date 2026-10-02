// ProductGrid.jsx
// Reemplaza a: renderizarProductos(), filtrarPorTexto(), filtrarProductos()
// y al HTML fijo de .search-container / .category-filters / #product-list
// que estaba en index.html.
//
// Lo que SIGUE dependiendo de Script.js (código clásico, no se movió):
//   - window.esUsuarioDuoc()   -> calcula si aplica el 20% de descuento
//   - window.agregarAlCarrito(codigo) -> guarda en localStorage y abre el modal
//   - window.verDetalle(codigo)       -> abre el modal de detalle
// Estas funciones siguen definidas en Script.js y quedan colgadas en "window"
// porque Script.js es un <script> clásico, así que React solo las invoca.

import { useState, useMemo } from "react";
import { productos } from "./productos.js";

const CATEGORIAS = [
    "Todos",
    "Consolas",
    "Computadores Gamers",
    "Accesorios",
    "Sillas Gamers",
    "Pantallas",
    "Mouse",
    "Mousepad",
    "Juegos de Mesa",
    "Poleras Personalizadas",
    "Polerones Gamers Personalizados"
];

export default function ProductGrid() {
    // Antes estas dos eran variables globales (categoriaSeleccionada, textoBusqueda).
    // En React viven como estado: cuando cambian, el componente se vuelve a
    // dibujar solo (ya no hace falta llamar renderizarProductos() a mano).
    const [categoria, setCategoria] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");

    // Se recalcula en cada render, igual que antes se llamaba esUsuarioDuoc()
    // dentro de renderizarProductos().
    const esDuoc = typeof window !== "undefined" && window.esUsuarioDuoc
        ? window.esUsuarioDuoc()
        : false;

    // useMemo evita recalcular el filtrado si categoria/busqueda no cambiaron
    // (equivalente a lo que hacía el .filter() de renderizarProductos()).
    const productosFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase().trim();
        return productos.filter((producto) => {
            const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
            const coincideNombre = producto.nombre.toLowerCase().includes(texto);
            return coincideCategoria && coincideNombre;
        });
    }, [categoria, busqueda]);

    function handleBuscar(texto) {
        setBusqueda(texto);
        // Misma regla que filtrarPorTexto(): si escribo algo, vuelvo a "Todos"
        if (texto.trim() !== "") {
            setCategoria("Todos");
        }
    }

    function handleFiltrarCategoria(cat) {
        setCategoria(cat);
        setBusqueda(""); // limpia el buscador, igual que filtrarProductos()
    }

    function handleAgregarCarrito(codigo) {
        if (window.agregarAlCarrito) window.agregarAlCarrito(codigo);
    }

    function handleVerDetalle(codigo) {
        if (window.verDetalle) window.verDetalle(codigo);
    }

    return (
        <>
            <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar producto por nombre..."
                    value={busqueda}
                    onChange={(e) => handleBuscar(e.target.value)}
                />
            </div>

            <div className="category-filters">
                {CATEGORIAS.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        className={
                            "filter-btn" +
                            (categoria === cat && busqueda.trim() === "" ? " active" : "")
                        }
                        onClick={() => handleFiltrarCategoria(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid-container">
                {productosFiltrados.length === 0 ? (
                    <div className="no-results">
                        <p>
                            ⚠️ No se encontraron productos que coincidan con "
                            <strong>{busqueda}</strong>".
                        </p>
                    </div>
                ) : (
                    productosFiltrados.map((producto) => (
                        <div className="product-card" key={producto.codigo}>
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                onClick={() => handleVerDetalle(producto.codigo)}
                                style={{ cursor: "pointer" }}
                                title="Haz clic para ver la descripción"
                            />
                            <h4>{producto.nombre}</h4>
                            <p>Categoría: {producto.categoria}</p>

                            {esDuoc ? (
                                <>
                                    <p
                                        style={{
                                            textDecoration: "line-through",
                                            color: "#aaa",
                                            fontSize: "0.9rem",
                                            marginTop: 5,
                                            marginBottom: 0
                                        }}
                                    >
                                        ${producto.precio.toLocaleString("es-CL")}
                                    </p>
                                    <p
                                        style={{
                                            fontWeight: "bold",
                                            color: "#39FF14",
                                            fontSize: "1.1rem",
                                            marginTop: 2
                                        }}
                                    >
                                        ${Math.round(producto.precio * 0.8).toLocaleString("es-CL")}{" "}
                                        <span style={{ fontSize: "0.8rem", color: "#39FF14" }}>
                                            (20% OFF)
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        color: "#1E90FF",
                                        fontSize: "1.1rem",
                                        marginTop: 5
                                    }}
                                >
                                    ${producto.precio.toLocaleString("es-CL")}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={() => handleAgregarCarrito(producto.codigo)}
                                style={{
                                    backgroundColor: "#39FF14",
                                    color: "black",
                                    border: "none",
                                    padding: 10,
                                    cursor: "pointer",
                                    marginTop: 10,
                                    width: "100%",
                                    borderRadius: 5,
                                    fontWeight: "bold"
                                }}
                            >
                                Añadir al Carrito
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
