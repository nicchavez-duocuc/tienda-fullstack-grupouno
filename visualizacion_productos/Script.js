// Script.js
// El arreglo "productos" y las funciones renderizarProductos(), filtrarPorTexto()
// y filtrarProductos() se movieron a productos.js + ProductGrid.jsx.
// La variable global "productos" sigue existiendo (la define productos.js
// vía window.productos), por eso las funciones de abajo pueden seguir
// usando "productos" tal cual sin ningún cambio.

// --- 0. GESTIÓN DE CARRITO E HISTORIAL POR USUARIO ---

// Obtiene la clave única del carrito según el usuario activo o sesión de invitado
function obtenerClaveCarrito() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActivo && usuarioActivo.correo) {
        return `carritoGamer_${usuarioActivo.correo.toLowerCase()}`;
    }
    return 'carritoGamer_invitado';
}

// Función global para leer el arreglo del carrito del usuario activo
function obtenerCarrito() {
    const clave = obtenerClaveCarrito();
    return JSON.parse(localStorage.getItem(clave)) || [];
}

// Función auxiliar para obtener la lista de productos de forma segura
function obtenerListaProductos() {
    let lista = (typeof productos !== 'undefined') ? productos : [];
    if (!lista || lista.length === 0) {
        // Respaldo de seguridad leyendo de localStorage si la variable global no carga
        lista = JSON.parse(localStorage.getItem('productosGamer')) || [];
    }
    return lista;
}

// --- 1. VERIFICACIÓN DE DESCUENTO INSTITUCIONAL ---

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

// --- 2. MODALES Y DETALLE DE PRODUCTOS ---

// Muestra el Modal con los detalles y la descripción del producto al hacer clic en la imagen
function verDetalle(codigo) {
    const listaProductos = obtenerListaProductos();
    const producto = listaProductos.find(p => p.codigo === codigo);
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

// --- 3. LÓGICA DE AGREGAR AL CARRITO Y FINALIZAR COMPRA (CON DEPURACIÓN) ---

function agregarAlCarrito(codigo) {
    console.log("Intentando agregar producto con código:", codigo); // <-- Nos dirá qué código llegó
    
    const listaProductos = obtenerListaProductos();
    console.log("Lista de productos disponible:", listaProductos); // <-- Nos dirá si la lista tiene elementos

    const producto = listaProductos.find(p => String(p.codigo) === String(codigo));
    
    if (!producto) {
        console.error("❌ ERROR: No se encontró ningún producto con el código:", codigo);
        alert("Error: No se encontró el producto en la base de datos.");
        return;
    }

    // Obtener la clave personalizada según el usuario logueado
    const claveCarrito = obtenerClaveCarrito();
    let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    let precioCalculado = producto.precio;
    if (esUsuarioDuoc()) {
        precioCalculado = Math.round(producto.precio * 0.80);
    }

    const index = carrito.findIndex(p => String(p.codigo) === String(codigo));
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        let productoAlCarrito = { 
            ...producto, 
            precio: precioCalculado, 
            cantidad: 1 
        };
        carrito.push(productoAlCarrito);
    }

    // Asegurarnos de que el producto no sea undefined antes de mostrar el modal
    mostrarModalAgregado(producto, precioCalculado);
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    console.log("✅ Producto agregado con éxito al carrito:", claveCarrito);
}

// Muestra el modal de confirmación con blindaje contra undefined
function mostrarModalAgregado(producto, precioCalculado) {
    if (!producto) return;

    const elNombre = document.getElementById('modal-nombre');
    const elImg = document.getElementById('modal-img');
    const elPrecio = document.getElementById('modal-precio');
    const elModal = document.getElementById('modal-agregado');

    if (elNombre) elNombre.innerText = producto.nombre || "Producto";
    if (elImg) elImg.src = producto.imagen || "";

    const precioAMostrar = precioCalculado !== undefined ? precioCalculado : (producto.precio || 0);
    if (elPrecio) elPrecio.innerText = "$" + precioAMostrar.toLocaleString('es-CL');

    if (elModal) elModal.style.display = 'flex';
}

// --- 4. SISTEMA DE RESEÑAS Y CALIFICACIONES ---

// Llena el selector de productos en el formulario
function cargarOpcionesProductosResena() {
    const selectProducto = document.getElementById('resena-producto');
    if (!selectProducto) return;

    selectProducto.innerHTML = '<option value="">Selecciona un producto...</option>';
    const listaProductos = obtenerListaProductos();
    listaProductos.forEach(prod => {
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

// --- 5. CARGA INICIAL DEL DOM ---

document.addEventListener('DOMContentLoaded', () => {
    cargarOpcionesProductosResena();
    renderizarResenas();
});

// --- 6. MODAL DE IMAGEN EXTRA ---

function abrirModalImagen() {
    const modal = document.getElementById('modal-imagen-extra');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function cerrarModalImagen() {
    const modal = document.getElementById('modal-imagen-extra');
    if (modal) {
        modal.style.display = 'none';
    }
}