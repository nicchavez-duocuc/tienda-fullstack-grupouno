// hooks/useCatalogo.jsx
// Estado y lógica de la lista de productos: texto de búsqueda, categoría
// seleccionada y lista filtrada. El catálogo se carga desde el backend
// (GET /api/v1/productos y /api/v1/categorias); si el backend no responde,
// se usa el catálogo de respaldo de productos.js para que la tienda no quede vacía.

import { useState, useMemo, useEffect } from "react";
import { productos as productosRespaldo } from "../productos.js";
import { CATEGORIAS } from "../categorias.jsx";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { aplicarDescuentoDuoc } from "../services/precios.jsx";
import { cargarProductos, cargarCategorias } from "../services/catalogo.jsx";

export function useCatalogo() {
    const [categoria, setCategoria] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState(CATEGORIAS);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Se carga el catálogo al abrir la página (una sola vez)
    useEffect(() => {
        let activo = true;

        Promise.all([cargarProductos(), cargarCategorias()])
            .then(([listaProductos, listaCategorias]) => {
                if (!activo) return;
                setProductos(listaProductos);

                // "Todos" + categorías del backend + las que aparezcan en productos
                const categoriasDeProductos = listaProductos.map((p) => p.categoria).filter(Boolean);
                const unicas = [...new Set([...listaCategorias, ...categoriasDeProductos])];
                setCategorias(["Todos", ...unicas]);
            })
            .catch(() => {
                if (!activo) return;
                // Respaldo local si el backend está apagado
                setProductos(productosRespaldo);
                setCategorias(CATEGORIAS);
                setError("No se pudo conectar con el servidor. Mostrando el catálogo local.");
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    // Se recalcula en cada render, igual que antes
    const esDuoc = esUsuarioDuoc();

    // Cada producto trae además su precio con descuento ya calculado, así los
    // componentes solo tienen que mostrarlo. (No se guarda en ningún lado.)
    const productosFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase().trim();
        return productos
            .filter((producto) => {
                const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
                const coincideNombre = producto.nombre.toLowerCase().includes(texto);
                return coincideCategoria && coincideNombre;
            })
            .map((producto) => ({ ...producto, precioDescuento: aplicarDescuentoDuoc(producto.precio) }));
    }, [productos, categoria, busqueda]);

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

    return {
        productos,
        categorias,
        categoriaActiva,
        busqueda,
        productosFiltrados,
        esDuoc,
        cargando,
        error,
        buscar,
        filtrarPorCategoria
    };
}
