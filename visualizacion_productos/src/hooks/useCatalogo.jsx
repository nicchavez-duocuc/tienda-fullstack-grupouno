// hooks/useCatalogo.jsx
// Estado y lógica de la lista de productos: texto de búsqueda, categoría
// seleccionada y lista filtrada. Reemplaza a filtrarPorTexto() y filtrarProductos().
// Ya no depende de nada de Script.js.

import { useState, useMemo } from "react";
import { productos } from "../productos.js";
import { CATEGORIAS } from "../categorias.jsx";
import { esUsuarioDuoc } from "../services/usuarios.jsx";
import { aplicarDescuentoDuoc } from "../services/precios.jsx";

export function useCatalogo() {
    const [categoria, setCategoria] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");

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

    return {
        categorias: CATEGORIAS,
        categoriaActiva,
        busqueda,
        productosFiltrados,
        esDuoc,
        buscar,
        filtrarPorCategoria
    };
}
