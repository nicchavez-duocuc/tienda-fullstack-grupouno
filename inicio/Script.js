// Arreglo completo de productos para LEVEL-UP GAMER
const productos = [
    {
        codigo: "P001",
        nombre: "PC Gamer ASUS ROG Strix",
        precio: 1500000,
        categoria: "Laptops",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZ-I_xCubhQ7o3zaWmwLephno1PbJ5BxOYXIaUhGfJA&s=10", 
        stock: 10,
        descripcion: "Computador de escritorio de alto rendimiento equipado con procesador de última generación y tarjeta gráfica dedicada. Diseñado para ejecutar juegos AAA en máxima resolución y transmitir en directo sin interrupciones."
    },
    {
        codigo: "P002",
        nombre: "Silla Gamer Secretlab Titan",
        precio: 350000,
        categoria: "Sillas Gamers",
        imagen: "https://s3-us-west-1.amazonaws.com/soltek/cd2d8d3f241d13630bc0d37a9bda5032.jpg",
        stock: 5,
        descripcion: "Silla ergonómica de gama alta diseñada para largas jornadas de juego. Cuenta con soporte lumbar integrado totalmente ajustable, tapizado transpirable de alta durabilidad y reclinación de hasta 165 grados."
    },
    {
        codigo: "P003",
        nombre: "Mousepad Razer Goliathus",
        precio: 25000,
        categoria: "Mousepad",
        imagen: "https://media.spdigital.cl/thumbnails/products/tmpnm7l26km_dcf0549b_thumbnail_512.jpg",
        stock: 20,
        descripcion: "Alfombrilla con tejido de microtextura optimizada para un equilibrio perfecto entre velocidad y control. Compatible con sensores ópticos y láser para garantizar la máxima precisión en cada movimiento."
    },
    {
        codigo: "P004",
        nombre: "PlayStation 5",
        precio: 550000,
        categoria: "Consolas",
        imagen: "https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/4/9/4948872415910-01.jpg",
        stock: 8,
        descripcion: "Consola de última generación con unidad SSD ultra rápida que elimina los tiempos de carga. Disfruta de gráficos en 4K, tecnología de trazado de rayos y la inmersión única del mando DualSense."
    },
    {
        codigo: "P005",
        nombre: "Xbox Series X",
        precio: 520000,
        categoria: "Consolas",
        imagen: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/745255999/variant/images/010cee8d-0234-487a-83db-14bba5a3a1af/745255999-0000-002.jpg",
        stock: 6,
        descripcion: "La consola más potente de Microsoft con 12 teraflops de potencia gráfica. Ofrece juegos en 4K reales a 120 FPS y compatibilidad con miles de títulos de cuatro generaciones de Xbox."
    },
    {
        codigo: "P006",
        nombre: "Nintendo Switch OLED",
        precio: 349990,
        categoria: "Consolas",
        imagen: "https://d2r8lpm0zljdak.cloudfront.net/catalog/product/cache/c68e9bbb2d73eded5f4972f8e568886c/c/o/consola_oled.png",
        stock: 15,
        descripcion: "Consola híbrida con una brillante pantalla OLED de 7 pulgadas con colores intensos y alto contraste. Incluye un soporte ancho ajustable, base con puerto LAN para cable y 64 GB de almacenamiento interno."
    }
];

// Variables de estado global
let categoriaSeleccionada = 'Todos';
let textoBusqueda = '';

// Función principal para dibujar los productos en pantalla
function renderizarProductos() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = '';

    // Filtrar arreglo según la categoría y el texto buscado
    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = (categoriaSeleccionada === 'Todos' || producto.categoria === categoriaSeleccionada);
        const coincideNombre = producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase().trim());
        return coincideCategoria && coincideNombre;
    });

    // Si no existen productos con el filtro aplicado
    if (productosFiltrados.length === 0) {
        productList.innerHTML = `
            <div class="no-results">
                <p>⚠️ No se encontraron productos que coincidan con "<strong>${textoBusqueda}</strong>".</p>
            </div>
        `;
        return;
    }

    // Dibujar tarjetas de los productos con evento onclick en las imágenes
    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" onclick="verDetalle('${producto.codigo}')" style="cursor: pointer;" title="Haz clic para ver la descripción">
            <h4>${producto.nombre}</h4>
            <p>Categoría: ${producto.categoria}</p>
            <p style="font-weight: bold; color: #12cee7; font-size: 1.1rem; margin-top: 5px;">
                $${producto.precio.toLocaleString('es-CL')}
            </p>
            <button onclick="agregarAlCarrito('${producto.codigo}')" style="background-color: #12e747; color: black; border: none; padding: 10px; cursor: pointer; margin-top:10px; width:100%; border-radius:5px; font-weight:bold;">Añadir al Carrito</button>
        `;
        
        productList.appendChild(card);
    });
}

// Captura lo que escribe el usuario y busca en el catálogo
function filtrarPorTexto(texto) {
    textoBusqueda = texto;

    if (texto.trim() !== '') {
        categoriaSeleccionada = 'Todos';
        
        const botones = document.querySelectorAll('.filter-btn');
        botones.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === 'Todos') {
                btn.classList.add('active');
            }
        });
    }

    renderizarProductos();
}

// Cambia de categoría y limpia el texto de búsqueda al presionar un botón de filtro
function filtrarProductos(categoria, elementoBoton) {
    categoriaSeleccionada = categoria;
    
    const inputBuscador = document.getElementById('input-buscador');
    if (inputBuscador) {
        inputBuscador.value = '';
        textoBusqueda = '';
    }

    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));
    
    if (elementoBoton) {
        elementoBoton.classList.add('active');
    }
    
    renderizarProductos();
}

// Muestra el Modal con los detalles y la descripción del producto al hacer clic en la imagen
function verDetalle(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    document.getElementById('modal-detalle-img').src = producto.imagen;
    document.getElementById('modal-detalle-nombre').innerText = producto.nombre;
    document.getElementById('modal-detalle-categoria').innerText = "Categoría: " + producto.categoria;
    document.getElementById('modal-detalle-descripcion').innerText = producto.descripcion || "Sin descripción disponible por el momento.";
    document.getElementById('modal-detalle-precio').innerText = "$" + producto.precio.toLocaleString('es-CL');
    
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

    const index = carrito.findIndex(p => p.codigo === codigo);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        let productoAlCarrito = { ...producto, cantidad: 1 };
        carrito.push(productoAlCarrito);
    }

    mostrarModalAgregado(producto);
    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
}

// Muestra el modal de confirmación cuando se agrega al carro
function mostrarModalAgregado(producto) {
    document.getElementById('modal-nombre').innerText = producto.nombre;
    document.getElementById('modal-img').src = producto.imagen;
    document.getElementById('modal-precio').innerText = "$" + producto.precio.toLocaleString('es-CL');
    
    document.getElementById('modal-agregado').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-agregado').style.display = 'none';
}

// Carga inicial al abrir o recargar la página








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
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    cargarOpcionesProductosResena();
    renderizarResenas();
});