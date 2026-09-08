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
    },
    {
        codigo: "P007",
        nombre: "Notebook Acer Nitro 5",
        precio: 899990,
        categoria: "Laptops",
        imagen: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/387183999/variant/images/8359e15d-c279-4ef3-a7b4-9369b1f9c091/387183999-0000-001.jpg",
        stock: 12,
        descripcion: "Laptop gamer portátil potente con sistema de refrigeración de doble ventilador. Pantalla de alta tasa de refresco y teclado retroiluminado, ideal para llevar tu estación de juego a donde quieras."
    },
    {
        codigo: "P008",
        nombre: "Teclado Mecánico HyperX Alloy Origins",
        precio: 85000,
        categoria: "Accesorios",
        imagen: "https://cdnx.jumpseller.com/valrod/image/7566074/thumb/719/719?1643992239",
        stock: 25,
        descripcion: "Teclado compacto y resistente fabricado con cuerpo completo de aluminio de grado aeronáutico. Interruptores mecánicos HyperX con iluminación RGB dinámica personalizable mediante software."
    },
    {
        codigo: "P009",
        nombre: "Mouse Logitech G502 Hero",
        precio: 45000,
        categoria: "Mouse",
        imagen: "https://cdnx.jumpseller.com/smart-tech/image/21706862/g502-hero-inthebox-mobile-nw.webp?1642774271",
        stock: 30,
        descripcion: "Mouse gamer legendario con sensor óptico HERO 25K de máxima precisión. Cuenta con 11 botones programables, pesas ajustables para personalizar el centro de gravedad e iluminación RGB LIGHTSYNC."
    },
    {
        codigo: "P010",
        nombre: "Audífonos Razer Kraken V3",
        precio: 95000,
        categoria: "Accesorios",
        imagen: "https://www.gamingxstorerd.com/cdn/shop/files/71Ns3dpNLDL._AC_SL1500.jpg?v=1721225614&width=1946",
        stock: 18,
        descripcion: "Headset con sonido envolvente THX Spatial Audio para posicionamiento acústico realista. Diafragmas de titanio de 50 mm y almohadillas de tela de híbridas para máximo confort térmico."
    },
    {
        codigo: "P011",
        nombre: "Silla Gamer Cougar Armor One",
        precio: 180000,
        categoria: "Sillas Gamers",
        imagen: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/bb228f59-3aa1-4d9e-bbf4-b5f71bc89ca0/MKEO79TIX8/MKEO79TIX8-1/1700585755319-MKEO79TIX8-1-1.jpg",
        stock: 7,
        descripcion: "Silla ergonómica diseñada con estructura de acero de alta resistencia. Incluye cojines para zona lumbar y cervical, reclinación hasta 180 grados y apoyabrazos ajustables 2D."
    },
    {
        codigo: "P012",
        nombre: "Monitor Gamer LG UltraGear 27'' 144Hz",
        precio: 260000,
        categoria: "Pantallas",
        imagen: "https://media.spdigital.cl/thumbnails/products/_e6sglmn_65bd6e10_thumbnail_4096.jpg",
        stock: 9,
        descripcion: "Pantalla de 27 pulgadas con tiempo de respuesta de 1 ms y tasa de refresco de 144Hz. Compatible con AMD FreeSync para eliminar el desgarro de pantalla durante partidas competitivas."
    },
    {
        codigo: "P013",
        nombre: "Monitor Gamer LG UltraGear de 27",
        precio: 279990,
        categoria: "Pantallas",
        imagen: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/e978782a-30c3-43cc-9644-fdad5ae3b8d9/MKZC7JFPP6/MKZC7JFPP6-1/1702305854747-MKZC7JFPP6-1-1.jpg",
        stock: 7,
        descripcion: "Monitor IPS de alta precisión cromática con brillo y contraste mejorados. Ofrece ángulos de visión ultra amplios y respuesta rápida para juegos eSports profesionales."
    },
    {
        codigo: "P014",
        nombre: "Catan",
        precio: 29990,
        categoria: "Juegos de Mesa",
        imagen: "https://ansaldo.cl/cdn/shop/files/17645_66f20db0-ba69-416f-af76-dfbe9486ea3c.jpg?v=1745861121",
        stock: 8,
        descripcion: "El mundialmente famoso juego de mesa estratégico. Negocia, comercia y coloniza la isla de Catan mientras compites por construir caminos, poblados y ciudades antes que tus oponentes."
    },
    {
        codigo: "P015",
        nombre: "Carcassonne",
        precio: 24990,
        categoria: "Juegos de Mesa",
        imagen: "https://home.ripley.cl/store/Attachment/WOP/D175/2000370634407/2000370634407-1.jpg",
        stock: 9,
        descripcion: "Juego de mesa clásico de colocación de fichas donde los jugadores van creando el mapa de la región francesa medieval de Carcasona con caminos, monasterios y ciudades."
    },
    {
        codigo: "P016",
        nombre: "Mouse Gamer Hp G100 Iluminacion Led Azul Color Negro",
        precio: 12350,
        categoria: "Mouse",
        imagen: "https://www.atcsjo.com/public/uploads/all/kCcNGk6vIi486Cn758QBywNbE16qxpKmNND8aOeS.jpg",
        stock: 25,
        descripcion: "Mouse de diseño ambidiestro con sensor óptico de DPI ajustable rápidamente (800 / 1200 / 2000 DPI). Incluye iluminación LED fija en tono azul neón."
    },
    {
        codigo: "P017",
        nombre: "Mouse Pad Gamer Antideslizante XL TOGO",
        precio: 10000,
        categoria: "Mousepad",
        imagen: "https://cdnx.jumpseller.com/gti-electronica/image/30266002/resize/640/640?1671113507",
        stock: 10,
        descripcion: "Mousepad extendido de tamaño XL ideal para albergar tanto teclado mecánico como mouse. Bordes costurados de alta resistencia que previenen el deshilachado y base de goma antideslizante."
    },
    {
        codigo: "P018",
        nombre: "Polera Personalizada DTF Full Color",
        precio: 13000,
        categoria: "Poleras Personalizadas",
        imagen: "https://cdnx.jumpseller.com/gyrografik/image/47666484/Polera-personalizada-DTF-NEGRO02.png?1713158059",
        stock: 15,
        descripcion: "Polera 100% algodón de excelente gramaje estampada mediante técnica DTF de alta definición. Colores vibrantes y gran durabilidad al lavado."
    },
    {
        codigo: "P019",
        nombre: "Polera Personalizada Diseño Cartoon",
        precio: 10990,
        categoria: "Poleras Personalizadas",
        imagen: "https://stamparetostores.gr/wp-content/uploads/2024/01/MICKEY-MINNIE.jpg",
        stock: 13,
        descripcion: "Polera con estampado artístico de temática anime / cartoon gamer. Tela suave y fresca, confeccionada con materiales de alta calidad."
    },
    {
        codigo: "P020",
        nombre: "Poleron Cyberpunk 2077 Gamer Futurista Ps4",
        precio: 30900,
        categoria: "Polerones Gamers Personalizados",
        imagen: "https://www.dyenamik.com/cdn/shop/files/Cyberpunk207745.webp?v=1751018744&width=2000",
        stock: 17,
        descripcion: "Polerón afelpado con gorro e inspiraciones estéticas futuristas de Cyberpunk 2077. Costuras reforzadas, ideal para mantenerse abrigado con un estilo gamer moderno."
    },
    {
        codigo: "P021",
        nombre: "Polerón Niño Super Mario Bros Videojuegos",
        precio: 20890,
        categoria: "Polerones Gamers Personalizados",
        imagen: "https://cdnx.jumpseller.com/grafimax/image/58426557/thumb/430/573?1752511309",
        stock: 20,
        descripcion: "Polerón infantil térmico con estampado frontal de Super Mario Bros. Confección suave en franela de algodón pensada para la comodidad de los más pequeños."
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