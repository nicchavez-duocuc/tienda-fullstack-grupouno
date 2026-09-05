// Arreglo completo de productos para LEVEL-UP GAMER
const productos = [
    {
        codigo: "P001",
        nombre: "PC Gamer ASUS ROG Strix",
        precio: 1500000,
        categoria: "Computadores",
        imagen: "https://dlcdnwebimgs.asus.com/gain/14730014-9B03-4369-83EE-B668F348B5AA", 
        stock: 10
    },
    {
        codigo: "P002",
        nombre: "Silla Gamer Secretlab Titan",
        precio: 350000,
        categoria: "Sillas",
        imagen: "https://images.secretlab.co/theme/common/proj_ps_landing_feature_chairs.png",
        stock: 5
    },
    {
        codigo: "P003",
        nombre: "Mousepad Razer Goliathus",
        precio: 25000,
        categoria: "Accesorios",
        imagen: "https://gansor.ru/image/cache/catalog/mpad/4ac5ae6fadb7f199f2af294b9ae6a6dd.png",
        stock: 20
    },
    {
        codigo: "P004",
        nombre: "PlayStation 5",
        precio: 550000,
        categoria: "Consolas",
        imagen: "https://avatars.mds.yandex.net/get-mpic/12366926/2a0000018d13ca2a777cd7b46775f90ade82/orig",
        stock: 8
    },
    {
        codigo: "P005",
        nombre: "Xbox Series X",
        precio: 520000,
        categoria: "Consolas",
        imagen: "https://www.gamebuy.ru/sites/default/files/screenshots/consoles/main-47971-xbox-series-xs1082047.png",
        stock: 6
    },
    {
        codigo: "P006",
        nombre: "Nintendo Switch OLED",
        precio: 349990,
        categoria: "Consolas",
        imagen: "https://cdn.awsli.com.br/2500x2500/1781/1781384/produto/218043801/1-t6t3dotsdg.png",
        stock: 15
    },
    {
        codigo: "P007",
        nombre: "Notebook Gamer Acer Nitro 5",
        precio: 899990,
        categoria: "Computadores",
        imagen: "https://newark.cl/storage/2022/05/nitro5_an515-57_bl_bk_modelmain.png",
        stock: 12
    },
    {
        codigo: "P008",
        nombre: "Teclado HyperX Alloy Origins",
        precio: 85000,
        categoria: "Accesorios",
        imagen: "https://cdnx.jumpseller.com/cibertech/image/45518548/resize/1500/1500?1707855452",
        stock: 25
    },
    {
        codigo: "P009",
        nombre: "Mouse Logitech G502 Hero",
        precio: 45000,
        categoria: "Accesorios",
        imagen: "https://solucionestcp.cl/wp-content/uploads/2025/09/Logitech-G502-HERO.png",
        stock: 30
    },
    {
        codigo: "P010",
        nombre: "Audífonos Razer Kraken V3",
        precio: 95000,
        categoria: "Accesorios",
        imagen: "https://www.stormforcegaming.co.uk/wp-content/uploads/2026/01/Hero-Image-Razer-Kraken-V3-X-Black-Gaming-Headset-1200x1200.webp",
        stock: 18
    },
    {
        codigo: "P011",
        nombre: "Silla Gamer Cougar Armor One",
        precio: 180000,
        categoria: "Sillas",
        imagen: "https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2025/02/ARMOR-ONE-V2-GRAY-F-1a.webp",
        stock: 7
    },
    {
        codigo: "P012",
        nombre: "Monitor Gamer LG UltraGear 27",
        precio: 260000,
        categoria: "Pantallas",
        imagen: "https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/4187695d-dee4-4f27-b9da-dba9127218b7/MKTF1AOM54/MKTF1AOM54-1/1747430539787-MKTF1AOM54-1-1.png",
        stock: 9
    }
];

// Función segura para obtener el carrito de localStorage
function obtenerCarrito() {
    try {
        const carritoGuardado = localStorage.getItem('carritoGamer');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (e) {
        console.error("Error al leer el localStorage:", e);
        return [];
    }
}

// Función para mostrar los productos en el HTML
function cargarProductos() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ''; 

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio.toLocaleString('es-CL')}</p>
            <button class="btn-add-cart" style="background-color: #12e747; color: #242222; border: none; padding: 10px; cursor: pointer; margin-top:10px; width:100%; border-radius:5px; font-weight:bold; font-size: 15px;">Añadir al Carrito</button>
        `;

        // Asignación limpia del evento de clic mediante JavaScript (Evita el onclick="...")
        const boton = card.querySelector('.btn-add-cart');
        boton.addEventListener('click', () => agregarAlCarrito(producto.codigo));
        
        productList.appendChild(card);
    });
}

// Función para agregar al carrito con validación de stock
function agregarAlCarrito(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (!producto) return;

    let carrito = obtenerCarrito();

    const index = carrito.findIndex(p => p.codigo === codigo);
    const cantidadActual = index !== -1 ? carrito[index].cantidad : 0;

    // Validación de stock
    if (cantidadActual + 1 > producto.stock) {
        alert(`Lo sentimos, no hay suficiente stock disponible para ${producto.nombre}. Stock disponible: ${producto.stock}`);
        return;
    }

    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    try {
        localStorage.setItem('carritoGamer', JSON.stringify(carrito));
        alert(`¡${producto.nombre} fue agregado a tu carrito!`);
    } catch (e) {
        console.error("Error al guardar en el localStorage:", e);
        alert("No se pudo guardar el producto en el carrito.");
    }
}

document.addEventListener('DOMContentLoaded', cargarProductos);

window.agregarAlCarrito = agregarAlCarrito;
window.cargarProductos = cargarProductos;