// productos.js
// Única fuente de verdad para el catálogo. Se exporta como módulo ES6
// para que ProductGrid.jsx pueda importarlo con `import`.
//
// La línea final (window.productos = productos) es el puente de compatibilidad:
// deja el mismo arreglo disponible como variable global "productos", que es
// como Script.js (un script clásico, no un módulo) sigue usándolo en
// agregarAlCarrito, verDetalle y cargarOpcionesProductosResena.
// Así NO duplicamos el catálogo en dos lugares.

export const productos = [
    {
        codigo: "P001",
        nombre: "PC Gamer ASUS ROG Strix",
        precio: 1500000,
        categoria: "Computadores Gamers",
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
        nombre: "Notebook Gamer Acer Nitro 5",
        precio: 899990,
        categoria: "Computadores Gamers",
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
        imagen: "https://http2.mlstatic.com/D_NQ_NP_894622-MLA106036056946_022026-O.webp",
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
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_735652-MLC93437368874_092025-F-polera-personalizada-diseno-cartoon-amor-estampado-pareja.webp",
        stock: 13,
        descripcion: "Polera con estampado artístico de temática anime / cartoon gamer. Tela suave y fresca, confeccionada con materiales de alta calidad."
    },
    {
        codigo: "P020",
        nombre: "Poleron Cyberpunk 2077 Gamer Futurista Ps4",
        precio: 30900,
        categoria: "Polerones Gamers Personalizados",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_858072-MLC74429085870_022024-F-poleron-cyberpunk-2077-gamer-futurista-ps4-cdprojektred.webp",
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

// Puente de compatibilidad con Script.js (script clásico, sin import/export)
if (typeof window !== "undefined") {
    window.productos = productos;
}
