// services/catalogo.jsx
// Catálogo de la tienda leído desde el backend de Spring Boot:
//   GET /api/v1/productos  -> [{ codigo, nombre, precio, stock, imagen, descripcion, categoria: { nombre } }]
//   GET /api/v1/categorias -> [{ id, nombre, descripcion }]
// Así los productos que se crean en el panel ADMIN aparecen al instante en la tienda.

export const BASE_API = "http://localhost:8080/api/v1";

// Normaliza un producto del backend a la forma que usan los componentes.
function normalizarProducto(datos) {
    return {
        codigo: String(datos.codigo),
        nombre: datos.nombre,
        precio: Number(datos.precio) || 0,
        stock: datos.stock,
        imagen: datos.imagen,
        descripcion: datos.descripcion || "",
        categoria: datos.categoria ? datos.categoria.nombre || "" : ""
    };
}

export async function cargarProductos() {
    const respuesta = await fetch(`${BASE_API}/productos`);
    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el catálogo desde el servidor.");
    }
    const datos = await respuesta.json();
    return (Array.isArray(datos) ? datos : []).map(normalizarProducto);
}

export async function cargarCategorias() {
    const respuesta = await fetch(`${BASE_API}/categorias`);
    if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las categorías desde el servidor.");
    }
    const datos = await respuesta.json();
    return (Array.isArray(datos) ? datos : []).map((categoria) => categoria.nombre).filter(Boolean);
}
