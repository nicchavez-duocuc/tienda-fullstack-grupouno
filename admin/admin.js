// Obtiene la lista de productos: desde localStorage si ya hay modificaciones, 
// o bien toma directamente el arreglo "productos" del script original.
function obtenerProductos() {
    try {
        const guardados = localStorage.getItem('productosGamer');
        if (!guardados) {
            // Reutiliza la variable global "productos" definida en productos.js
            localStorage.setItem('productosGamer', JSON.stringify(productos));
            return productos;
        }
        return JSON.parse(guardados);
    } catch (e) {
        console.error("Error al leer localStorage:", e);
        return typeof productos !== 'undefined' ? productos : [];
    }
}

// Guarda los cambios en localStorage
function guardarProductos(lista) {
    try {
        localStorage.setItem('productosGamer', JSON.stringify(lista));
    } catch (e) {
        console.error("Error al guardar en localStorage:", e);
    }
}

// Muestra los productos en la tabla
function cargarTablaProductos() {
    const lista = obtenerProductos();
    const tbody = document.getElementById('tabla-productos');
    if (!tbody) return;

    tbody.innerHTML = '';

    lista.forEach((p, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.imagen}" alt="${p.nombre}"></td>
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>$${p.precio.toLocaleString('es-CL')}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn-edit" onclick="prepararEdicion(${index})">Editar</button>
                <button class="btn-delete" onclick="borrarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Guardar (Crear o Editar)
document.getElementById('form-producto').addEventListener('submit', function(e) {
    e.preventDefault();

    const lista = obtenerProductos();
    const index = document.getElementById('producto-index').value;

    const nuevoProducto = {
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        precio: Number(document.getElementById('precio').value),
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value,
        stock: Number(document.getElementById('stock').value)
    };

    if (index === "") {
        // Crear
        if (lista.some(p => p.codigo === nuevoProducto.codigo)) {
            alert("Error: Ya existe un producto con este código.");
            return;
        }
        lista.push(nuevoProducto);
    } else {
        // Editar
        lista[index] = nuevoProducto;
    }

    guardarProductos(lista);
    limpiarFormulario();
    cargarTablaProductos();
});

// Carga los datos en el formulario para editar
window.prepararEdicion = function(index) {
    const lista = obtenerProductos();
    const p = lista[index];

    document.getElementById('producto-index').value = index;
    document.getElementById('codigo').value = p.codigo;
    document.getElementById('codigo').disabled = true; // No permite editar el código base
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('precio').value = p.precio;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('imagen').value = p.imagen;
    document.getElementById('stock').value = p.stock;

    document.getElementById('form-title').innerText = "Editar Producto";
    document.getElementById('btn-cancelar').style.display = "inline-block";
};

// Borra un producto del inventario
window.borrarProducto = function(index) {
    const lista = obtenerProductos();
    if (confirm(`¿Estás seguro de eliminar ${lista[index].nombre}?`)) {
        lista.splice(index, 1);
        guardarProductos(lista);
        cargarTablaProductos();
    }
};

// Cancelar edición y limpiar
document.getElementById('btn-cancelar').addEventListener('click', limpiarFormulario);

function limpiarFormulario() {
    document.getElementById('form-producto').reset();
    document.getElementById('producto-index').value = "";
    document.getElementById('codigo').disabled = false;
    document.getElementById('form-title').innerText = "Agregar Nuevo Producto";
    document.getElementById('btn-cancelar').style.display = "none";
}

document.addEventListener('DOMContentLoaded', cargarTablaProductos);