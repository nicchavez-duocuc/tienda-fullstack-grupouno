// hooks/useCatalogo.jsx
// Estado y lógica de la lista de productos: texto de búsqueda, categoría
// seleccionada y lista filtrada. El catálogo ahora viene del backend
// (GET /api/v1/productos y /api/v1/categorias): cada producto lleva su
// categoría como objeto y los filtros la comparan por su nombre.

import { useState, useEffect, useMemo } from "react";
import { peticion } from "../services/api.jsx";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { aplicarDescuentoDuoc } from "../services/precios.jsx";

export function useCatalogo() {
    const [categoria, setCategoria] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] = useState([]);
    const [nombresCategorias, setNombresCategorias] = useState([]);

    // Carga única del catálogo y las categorías desde el backend
    useEffect(() => {
        async function cargarCatalogo() {
            try {
                const [productosApi, categoriasApi] = await Promise.all([
                    peticion("/productos"),
                    peticion("/categorias")
                ]);
                setProductos(productosApi);
                setNombresCategorias(categoriasApi.map((categoria) => categoria.nombre));
            } catch (error) {
                console.error("No se pudo cargar el catálogo desde el backend:", error.mensaje || error);
            }
        }
        cargarCatalogo();
    }, []);

    // Se recalcula en cada render, igual que antes
    const esDuoc = esUsuarioDuoc();

    // Cada producto trae además su precio con descuento ya calculado, así los
    // componentes solo tienen que mostrarlo. (No se guarda en ningún lado.)
    const productosFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase().trim();
        return productos
            .filter((producto) => {
                const nombreCategoria = producto.categoria ? producto.categoria.nombre : "";
                const coincideCategoria = categoria === "Todos" || nombreCategoria === categoria;
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
        categorias: ["Todos", ...nombresCategorias],
        categoriaActiva,
        busqueda,
        productos,
        productosFiltrados,
        esDuoc,
        buscar,
        filtrarPorCategoria
    };
}
