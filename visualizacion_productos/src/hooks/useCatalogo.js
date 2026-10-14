// hooks/useCatalogo.js
// Estado y lógica de la tienda: texto de búsqueda, categoría seleccionada y
// lista filtrada. Reemplaza a renderizarProductos(), filtrarPorTexto() y
// filtrarProductos() del Script.js original.
//
// Lo que SIGUE en Script.js (código clásico, no se movió) y acá solo se llama:
//   - window.esUsuarioDuoc()          -> ¿aplica el 20% de descuento?
//   - window.agregarAlCarrito(codigo) -> guarda en localStorage y abre el modal
//   - window.verDetalle(codigo)       -> abre el modal de detalle

import { useState, useMemo } from "react";
import { productos } from "../productos.js";
import { CATEGORIAS } from "../categorias.js";

export function useCatalogo() {
    const [categoria, setCategoria] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");

    // Se recalcula en cada render, igual que antes en renderizarProductos()
    const esDuoc =
        typeof window !== "undefined" && window.esUsuarioDuoc ? window.esUsuarioDuoc() : false;

    const productosFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase().trim();
        return productos.filter((producto) => {
            const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
            const coincideNombre = producto.nombre.toLowerCase().includes(texto);
            return coincideCategoria && coincideNombre;
        });
    }, [categoria, busqueda]);

    // Mientras hay texto en el buscador, ninguna categoría se ve activa
    const categoriaActiva = busqueda.trim() === "" ? categoria : null;

    function buscar(texto) {
        setBusqueda(texto);
        // Misma regla de siempre: si escribo algo, vuelvo a "Todos"
        if (texto.trim() !== "") {
            setCategoria("Todos");
        }
    }

    function filtrarPorCategoria(nuevaCategoria) {
        setCategoria(nuevaCategoria);
        setBusqueda(""); // limpia el buscador
    }

    function agregarAlCarrito(codigo) {
        if (window.agregarAlCarrito) window.agregarAlCarrito(codigo);
    }

    function verDetalle(codigo) {
        if (window.verDetalle) window.verDetalle(codigo);
    }

    return {
        categorias: CATEGORIAS,
        categoriaActiva,
        busqueda,
        productosFiltrados,
        esDuoc,
        buscar,
        filtrarPorCategoria,
        agregarAlCarrito,
        verDetalle
    };
}
