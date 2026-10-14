// Script.js
// El arreglo "productos" y las funciones renderizarProductos(), filtrarPorTexto()
// y filtrarProductos() se movieron a productos.js + ProductGrid.jsx.
// La variable global "productos" sigue existiendo (la define productos.js
// vía window.productos), por eso las funciones de abajo pueden seguir
// usando "productos" tal cual sin ningún cambio.

function esUsuarioDuoc() {
    // 1. Revisar si hay sesión activa en usuarioActivo
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActivo && usuarioActivo.correo) {
        return usuarioActivo.correo.toLowerCase().endsWith('@duocuc.cl');
    }

    // 2. Si no hay sesión activa, revisar la lista general UsuariosGamer
    const usuariosGuardados = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];
    if (usuariosGuardados.length > 0) {
        const ultimo = usuariosGuardados[usuariosGuardados.length - 1];
        return ultimo.correo && ultimo.correo.toLowerCase().endsWith('@duocuc.cl');
    }

    return false;
}

// Muestra el Modal con los detalles y la descripción del producto al hacer clic en la imagen
function verDetalle(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    document.getElementById('modal-detalle-img').src = producto.imagen;
    document.getElementById('modal-detalle-nombre').innerText = producto.nombre;
    document.getElementById('modal-detalle-categoria').innerText = "Categoría: " + producto.categoria;
    document.getElementById('modal-detalle-descripcion').innerText = producto.descripcion || "Sin descripción disponible por el momento.";

    const elPrecio = document.getElementById('modal-detalle-precio');
    if (elPrecio) {
        if (esUsuarioDuoc()) {
            const precioDescuento = Math.round(producto.precio * 0.80);
            elPrecio.innerHTML = `
                <span style="text-decoration: line-through; color: #aaa; font-size: 0.9rem;">$${producto.precio.toLocaleString('es-CL')}</span>
                <span style="color: #39FF14; font-weight: bold; font-size: 1.2rem; margin-left: 8px;">$${precioDescuento.toLocaleString('es-CL')} (20% OFF)</span>
            `;
        } else {
            elPrecio.innerText = "$" + producto.precio.toLocaleString('es-CL');
        }
    }

    const btnAgregar = document.getElementById('modal-detalle-btn-agregar');
    btnAgregar.onclick = () => {
        cerrarModalDetalle();
        agregarAlCarrito(producto.codigo);
    };

    document.getElementById('modal-detalle').style.display = 'flex';
}

function cerrarModalDetalle() {
    document.getElementById('modal-detalle').style.display = 'none';
}

// Función para agregar al carrito guardando en localStorage
function agregarAlCarrito(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    let precioCalculado = producto.precio;
    if (esUsuarioDuoc()) {
        precioCalculado = Math.round(producto.precio * 0.80);
    }

    const index = carrito.findIndex(p => p.codigo === codigo);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        let productoAlCarrito = { ...producto, cantidad: 1 };
        carrito.push(productoAlCarrito);
    }

    mostrarModalAgregado(producto, precioCalculado);
    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
}

// Muestra el modal de confirmación cuando se agrega al carro
function mostrarModalAgregado(producto, precioCalculado) {
    document.getElementById('modal-nombre').innerText = producto.nombre;
    document.getElementById('modal-img').src = producto.imagen;

    const precioAMostrar = precioCalculado !== undefined ? precioCalculado : producto.precio;
    document.getElementById('modal-precio').innerText = "$" + precioAMostrar.toLocaleString('es-CL');

    document.getElementById('modal-agregado').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-agregado').style.display = 'none';
}

// --- SISTEMA DE RESEÑAS Y CALIFICACIONES ---

// Llena el selector de productos en el formulario
function cargarOpcionesProductosResena() {
    const selectProducto = document.getElementById('resena-producto');
    if (!selectProducto) return;

    selectProducto.innerHTML = '<option value="">Selecciona un producto...</option>';
    productos.forEach(prod => {
        const option = document.createElement('option');
        option.value = prod.nombre;
        option.textContent = prod.nombre;
        selectProducto.appendChild(option);
    });
}

// Renderiza las reseñas desde localStorage
function renderizarResenas() {
    const listaResenas = document.getElementById('lista-resenas');
    if (!listaResenas) return;

    let resenas = JSON.parse(localStorage.getItem('resenasGamer')) || [
        {
            producto: "PC Gamer ASUS ROG Strix",
            nombre: "Carlos M.",
            puntuacion: 5,
            comentario: "Excelente rendimiento en juegos, corren todos los títulos en ultra sin problemas.",
            fecha: "05/09/2026"
        }
    ];

    listaResenas.innerHTML = '';

    if (resenas.length === 0) {
        listaResenas.innerHTML = '<p style="color: #aaa;">Aún no hay reseñas. ¡Sé el primero en opinar!</p>';
        return;
    }

    resenas.forEach(resena => {
        const estrellas = '★'.repeat(resena.puntuacion) + '☆'.repeat(5 - resena.puntuacion);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-header">
                <strong>${resena.nombre}</strong>
                <span class="review-stars">${estrellas}</span>
            </div>
            <p class="review-product">📦 <em>${resena.producto}</em></p>
            <p class="review-comment">"${resena.comentario}"</p>
            <small class="review-date">${resena.fecha}</small>
        `;
        listaResenas.appendChild(card);
    });
}

// Guarda una nueva reseña
function guardarResena(event) {
    event.preventDefault();

    const producto = document.getElementById('resena-producto').value;
    const nombre = document.getElementById('resena-nombre').value;
    const puntuacion = parseInt(document.getElementById('resena-puntuacion').value);
    const comentario = document.getElementById('resena-comentario').value;

    const nuevaResena = {
        producto,
        nombre,
        puntuacion,
        comentario,
        fecha: new Date().toLocaleDateString('es-CL')
    };

    let resenas = JSON.parse(localStorage.getItem('resenasGamer')) || [];
    resenas.unshift(nuevaResena);
    localStorage.setItem('resenasGamer', JSON.stringify(resenas));

    document.getElementById('form-resena').reset();
    renderizarResenas();
}

// Carga inicial al abrir o recargar la página
// Ya NO llamamos renderizarProductos() aquí: eso ahora lo hace React
// automáticamente en cuanto main.jsx monta <ProductGrid />.
document.addEventListener('DOMContentLoaded', () => {
    cargarOpcionesProductosResena();
    renderizarResenas();
});

// Función para mostrar el mapa
function abrirModalImagen() {
    const modal = document.getElementById('modal-imagen-extra');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Función para ocultar la imagen al presionar la X
function cerrarModalImagen() {
    const modal = document.getElementById('modal-imagen-extra');
    if (modal) {
        modal.style.display = 'none';
    }
}
