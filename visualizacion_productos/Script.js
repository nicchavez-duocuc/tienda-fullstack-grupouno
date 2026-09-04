// Arreglo completo de productos para LEVEL-UP GAMER
const productos = [
    {
        codigo: "P001",
        nombre: "PC Gamer ASUS ROG Strix",
        precio: 1500000,
        categoria: "Computadores Gamers",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZ-I_xCubhQ7o3zaWmwLephno1PbJ5BxOYXIaUhGfJA&s=10", 
        stock: 10
    },
    {
        codigo: "P002",
        nombre: "Silla Gamer Secretlab Titan",
        precio: 350000,
        categoria: "Sillas Gamers",
        imagen: "https://s3-us-west-1.amazonaws.com/soltek/cd2d8d3f241d13630bc0d37a9bda5032.jpg",
        stock: 5
    },
    {
        codigo: "P003",
        nombre: "Mousepad Razer Goliathus",
        precio: 25000,
        categoria: "Mousepad",
        imagen: "https://media.spdigital.cl/thumbnails/products/tmpnm7l26km_dcf0549b_thumbnail_512.jpg",
        stock: 20
    },
    {
        codigo: "P004",
        nombre: "PlayStation 5",
        precio: 550000,
        categoria: "Consolas",
        imagen: "https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/4/9/4948872415910-01.jpg",
        stock: 8
    },
    {
        codigo: "P005",
        nombre: "Xbox Series X",
        precio: 520000,
        categoria: "Consolas",
        imagen: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/745255999/variant/images/010cee8d-0234-487a-83db-14bba5a3a1af/745255999-0000-002.jpg",
        stock: 6
    },
    {
        codigo: "P006",
        nombre: "Nintendo Switch OLED",
        precio: 349990,
        categoria: "Consolas",
        imagen: "https://d2r8lpm0zljdak.cloudfront.net/catalog/product/cache/c68e9bbb2d73eded5f4972f8e568886c/c/o/consola_oled.png",
        stock: 15
    },
    {
        codigo: "P007",
        nombre: "Notebook Gamer Acer Nitro 5",
        precio: 899990,
        categoria: "Computadores Gamers",
        imagen: "https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/387183999/variant/images/8359e15d-c279-4ef3-a7b4-9369b1f9c091/387183999-0000-001.jpg",
        stock: 12
    },
    {
        codigo: "P008",
        nombre: "Teclado Mecánico HyperX Alloy Origins",
        precio: 85000,
        categoria: "Accesorios",
        imagen: "https://cdnx.jumpseller.com/valrod/image/7566074/thumb/719/719?1643992239",
        stock: 25
    },
    {
        codigo: "P009",
        nombre: "Mouse Logitech G502 Hero",
        precio: 45000,
        categoria: "Mouse",
        imagen: "https://cdnx.jumpseller.com/smart-tech/image/21706862/g502-hero-inthebox-mobile-nw.webp?1642774271",
        stock: 30
    },
    {
        codigo: "P010",
        nombre: "Audífonos Razer Kraken V3",
        precio: 95000,
        categoria: "Accesorios",
        imagen: "https://www.gamingxstorerd.com/cdn/shop/files/71Ns3dpNLDL._AC_SL1500.jpg?v=1721225614&width=1946",
        stock: 18
    },
    {
        codigo: "P011",
        nombre: "Silla Gamer Cougar Armor One",
        precio: 180000,
        categoria: "Sillas Gamers",
        imagen: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/bb228f59-3aa1-4d9e-bbf4-b5f71bc89ca0/MKEO79TIX8/MKEO79TIX8-1/1700585755319-MKEO79TIX8-1-1.jpg",
        stock: 7
    },
    {
        codigo: "P012",
        nombre: "Monitor Gamer LG UltraGear 27'' 144Hz",
        precio: 260000,
        categoria: "Pantallas",
        imagen: "https://media.spdigital.cl/thumbnails/products/_e6sglmn_65bd6e10_thumbnail_4096.jpg",
        stock: 9
    },
    {
        codigo: "P013",
        nombre: "Monitor Gamer LG UltraGear de 27",
        precio: 279990,
        categoria: "Pantallas",
        imagen: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/e978782a-30c3-43cc-9644-fdad5ae3b8d9/MKZC7JFPP6/MKZC7JFPP6-1/1702305854747-MKZC7JFPP6-1-1.jpg",
        stock: 7
    },
    {
        codigo: "P014",
        nombre: "Catan",
        precio: 29990,
        categoria: "Juegos de Mesa",
        imagen: "https://ansaldo.cl/cdn/shop/files/17645_66f20db0-ba69-416f-af76-dfbe9486ea3c.jpg?v=1745861121",
        stock: 8
    },
    {
        codigo: "P015",
        nombre: "Carcassonne",
        precio: 24990,
        categoria: "Juegos de Mesa",
        imagen: "https://home.ripley.cl/store/Attachment/WOP/D175/2000370634407/2000370634407-1.jpg",
        stock: 9
    },
    {
        codigo: "P016",
        nombre: "Mouse Gamer Hp G100 Iluminacion Led Azul Color Negro",
        precio: 12350,
        categoria: "Mouse",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_894622-MLA106036056946_022026-O.webp",
        stock: 25
    },
    {
        codigo: "P017",
        nombre: "Mouse Pad Gamer Antideslizante XL TOGO",
        precio: 10000,
        categoria: "Mousepad",
        imagen: "https://cdnx.jumpseller.com/gti-electronica/image/30266002/resize/640/640?1671113507",
        stock: 10
    },
    {
        codigo: "P018",
        nombre: "Polera Personalizada DTF Full Color",
        precio: 13000,
        categoria: "Poleras Personalizadas",
        imagen: "https://cdnx.jumpseller.com/gyrografik/image/47666484/Polera-personalizada-DTF-NEGRO02.png?1713158059",
        stock: 15
    },
    {
        codigo: "P019",
        nombre: "Polera Personalizada Diseño Cartoon",
        precio: 10990,
        categoria: "Poleras Personalizadas",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_735652-MLC93437368874_092025-F-polera-personalizada-diseno-cartoon-amor-estampado-pareja.webp",
        stock: 13
    },
    {
        codigo: "P020",
        nombre: "Poleron Cyberpunk 2077 Gamer Futurista Ps4",
        precio: 30900,
        categoria: "Polerones Gamers Personalizados",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_858072-MLC74429085870_022024-F-poleron-cyberpunk-2077-gamer-futurista-ps4-cdprojektred.webp",
        stock: 17
    },
    {
        codigo: "P021",
        nombre: "Polerón Niño Super Mario Bros Videojuegos",
        precio: 20890,
        categoria: "Polerones Gamers Personalizados",
        imagen: "https://cdnx.jumpseller.com/grafimax/image/58426557/thumb/430/573?1752511309",
        stock: 20
    }

];

// Función para mostrar los productos en el HTML 
function cargarProductos(categoriaAFiltrar = 'Todos') {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ''; 

    // Filtramos el arreglo según la categoría seleccionada
    const productosFiltrados = categoriaAFiltrar === 'Todos' 
        ? productos 
        : productos.filter(producto => producto.categoria === categoriaAFiltrar);

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio.toLocaleString('es-CL')}</p>
            <button onclick="agregarAlCarrito('${producto.codigo}')" style="background-color: #39FF14; color: black; border: none; padding: 10px; cursor: pointer; margin-top:10px; width:100%; border-radius:5px; font-weight:bold;">Añadir al Carrito</button>
        `;
        
        productList.appendChild(card);
    });
}

// Nueva función para manejar el clic en los botones de filtro
function filtrarProductos(categoria, elementoBoton) {
    // Quita la clase 'active' de todos los botones
    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));
    
    // Le agrega la clase 'active' solo al botón que presionaste
    if(elementoBoton) {
        elementoBoton.classList.add('active');
    }
    
    // Vuelve a cargar los productos aplicando el filtro
    cargarProductos(categoria);
}

// Mantiene la carga inicial cuando entras a la página
document.addEventListener('DOMContentLoaded', () => cargarProductos('Todos'));

// Función para agregar al carrito usando localStorage
function agregarAlCarrito(codigo) {
    // 1. Buscamos el producto en el arreglo por su código
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    // 2. Obtenemos el carrito actual guardado, o creamos uno vacío si no existe
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];

    // 3. Verificamos si el producto ya está en el carrito para sumar la cantidad
    const index = carrito.findIndex(p => p.codigo === codigo);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        // Clonamos el objeto producto y le añadimos la propiedad cantidad
        let productoAlCarrito = { ...producto, cantidad: 1 };
        carrito.push(productoAlCarrito);
    }

    mostrarModalAgregado(producto); //llamo la funcio que cree abajo

    // 4. Guardamos el carrito actualizado en el navegador
    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
    
    
}


// esta funcion muestra el mensaje del producto que se agrego al carrito con su imagen, nombre y precio
function mostrarModalAgregado(producto) {
    // Inyecta los datos del producto seleccionado en el HTML del modal
    document.getElementById('modal-nombre').innerText = producto.nombre;
    document.getElementById('modal-img').src = producto.imagen;
    document.getElementById('modal-precio').innerText = "$" + producto.precio.toLocaleString('es-CL');
    
    // Cambia el display a 'flex' para que se muestre en pantalla
    document.getElementById('modal-agregado').style.display = 'flex';
}

function cerrarModal() {
    // Vuelve a ocultar el modal
    document.getElementById('modal-agregado').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', cargarProductos);