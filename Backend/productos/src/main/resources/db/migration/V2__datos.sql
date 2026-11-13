-- Datos de arranque: categorias del catalogo, los 21 productos de productos.js,
-- cuentas de prueba (claves BCrypt) y reseñas de ejemplo

-- ---------- CATEGORIAS (mismas del frontend) ----------
INSERT INTO categoria (nombre) VALUES ('Consolas');
INSERT INTO categoria (nombre) VALUES ('Computadores Gamers');
INSERT INTO categoria (nombre) VALUES ('Accesorios');
INSERT INTO categoria (nombre) VALUES ('Sillas Gamers');
INSERT INTO categoria (nombre) VALUES ('Pantallas');
INSERT INTO categoria (nombre) VALUES ('Mouse');
INSERT INTO categoria (nombre) VALUES ('Mousepad');
INSERT INTO categoria (nombre) VALUES ('Juegos de Mesa');
INSERT INTO categoria (nombre) VALUES ('Poleras Personalizadas');
INSERT INTO categoria (nombre) VALUES ('Polerones Gamers Personalizados');

-- ---------- PRODUCTOS (exactamente los del catalogo original) ----------
INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P001', 'PC Gamer ASUS ROG Strix', 1500000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZ-I_xCubhQ7o3zaWmwLephno1PbJ5BxOYXIaUhGfJA&s=10', 10, 'Computador de escritorio de alto rendimiento equipado con procesador de última generación y tarjeta gráfica dedicada. Diseñado para ejecutar juegos AAA en máxima resolución y transmitir en directo sin interrupciones.', (SELECT id FROM categoria WHERE nombre='Computadores Gamers'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P002', 'Silla Gamer Secretlab Titan', 350000, 'https://s3-us-west-1.amazonaws.com/soltek/cd2d8d3f241d13630bc0d37a9bda5032.jpg', 5, 'Silla ergonómica de gama alta diseñada para largas jornadas de juego. Cuenta con soporte lumbar integrado totalmente ajustable, tapizado transpirable de alta durabilidad y reclinación de hasta 165 grados.', (SELECT id FROM categoria WHERE nombre='Sillas Gamers'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P003', 'Mousepad Razer Goliathus', 25000, 'https://media.spdigital.cl/thumbnails/products/tmpnm7l26km_dcf0549b_thumbnail_512.jpg', 20, 'Alfombrilla con tejido de microtextura optimizada para un equilibrio perfecto entre velocidad y control. Compatible con sensores ópticos y láser para garantizar la máxima precisión en cada movimiento.', (SELECT id FROM categoria WHERE nombre='Mousepad'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P004', 'PlayStation 5', 550000, 'https://www.weplay.cl/pub/media/catalog/product/cache/3f1b140c3c9f36fbf6b01dffb521c246/4/9/4948872415910-01.jpg', 8, 'Consola de última generación con unidad SSD ultra rápida que elimina los tiempos de carga. Disfruta de gráficos en 4K, tecnología de trazado de rayos y la inmersión única del mando DualSense.', (SELECT id FROM categoria WHERE nombre='Consolas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P005', 'Xbox Series X', 520000, 'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/745255999/variant/images/010cee8d-0234-487a-83db-14bba5a3a1af/745255999-0000-002.jpg', 6, 'La consola más potente de Microsoft con 12 teraflops de potencia gráfica. Ofrece juegos en 4K reales a 120 FPS y compatibilidad con miles de títulos de cuatro generaciones de Xbox.', (SELECT id FROM categoria WHERE nombre='Consolas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P006', 'Nintendo Switch OLED', 349990, 'https://d2r8lpm0zljdak.cloudfront.net/catalog/product/cache/c68e9bbb2d73eded5f4972f8e568886c/c/o/consola_oled.png', 15, 'Consola híbrida con una brillante pantalla OLED de 7 pulgadas con colores intensos y alto contraste. Incluye un soporte ancho ajustable, base con puerto LAN para cable y 64 GB de almacenamiento interno.', (SELECT id FROM categoria WHERE nombre='Consolas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P007', 'Notebook Gamer Acer Nitro 5', 899990, 'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/paris/387183999/variant/images/8359e15d-c279-4ef3-a7b4-9369b1f9c091/387183999-0000-001.jpg', 12, 'Laptop gamer portátil potente con sistema de refrigeración de doble ventilador. Pantalla de alta tasa de refresco y teclado retroiluminado, ideal para llevar tu estación de juego a donde quieras.', (SELECT id FROM categoria WHERE nombre='Computadores Gamers'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P008', 'Teclado Mecánico HyperX Alloy Origins', 85000, 'https://cdnx.jumpseller.com/valrod/image/7566074/thumb/719/719?1643992239', 25, 'Teclado compacto y resistente fabricado con cuerpo completo de aluminio de grado aeronáutico. Interruptores mecánicos HyperX con iluminación RGB dinámica personalizable mediante software.', (SELECT id FROM categoria WHERE nombre='Accesorios'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P009', 'Mouse Logitech G502 Hero', 45000, 'https://cdnx.jumpseller.com/smart-tech/image/21706862/g502-hero-inthebox-mobile-nw.webp?1642774271', 30, 'Mouse gamer legendario con sensor óptico HERO 25K de máxima precisión. Cuenta con 11 botones programables, pesas ajustables para personalizar el centro de gravedad e iluminación RGB LIGHTSYNC.', (SELECT id FROM categoria WHERE nombre='Mouse'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P010', 'Audífonos Razer Kraken V3', 95000, 'https://www.gamingxstorerd.com/cdn/shop/files/71Ns3dpNLDL._AC_SL1500.jpg?v=1721225614&width=1946', 18, 'Headset con sonido envolvente THX Spatial Audio para posicionamiento acústico realista. Diafragmas de titanio de 50 mm y almohadillas de tela de híbridas para máximo confort térmico.', (SELECT id FROM categoria WHERE nombre='Accesorios'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P011', 'Silla Gamer Cougar Armor One', 180000, 'https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/bb228f59-3aa1-4d9e-bbf4-b5f71bc89ca0/MKEO79TIX8/MKEO79TIX8-1/1700585755319-MKEO79TIX8-1-1.jpg', 7, 'Silla ergonómica diseñada con estructura de acero de alta resistencia. Incluye cojines para zona lumbar y cervical, reclinación hasta 180 grados y apoyabrazos ajustables 2D.', (SELECT id FROM categoria WHERE nombre='Sillas Gamers'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P012', 'Monitor Gamer LG UltraGear 27'''' 144Hz', 260000, 'https://media.spdigital.cl/thumbnails/products/_e6sglmn_65bd6e10_thumbnail_4096.jpg', 9, 'Pantalla de 27 pulgadas con tiempo de respuesta de 1 ms y tasa de refresco de 144Hz. Compatible con AMD FreeSync para eliminar el desgarro de pantalla durante partidas competitivas.', (SELECT id FROM categoria WHERE nombre='Pantallas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P013', 'Monitor Gamer LG UltraGear de 27', 279990, 'https://cl-cenco-pim-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/3840x0/filters:quality(75)/prd-cl/product-medias/e978782a-30c3-43cc-9644-fdad5ae3b8d9/MKZC7JFPP6/MKZC7JFPP6-1/1702305854747-MKZC7JFPP6-1-1.jpg', 7, 'Monitor IPS de alta precisión cromática con brillo y contraste mejorados. Ofrece ángulos de visión ultra amplios y respuesta rápida para juegos eSports profesionales.', (SELECT id FROM categoria WHERE nombre='Pantallas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P014', 'Catan', 29990, 'https://ansaldo.cl/cdn/shop/files/17645_66f20db0-ba69-416f-af76-dfbe9486ea3c.jpg?v=1745861121', 8, 'El mundialmente famoso juego de mesa estratégico. Negocia, comercia y coloniza la isla de Catan mientras compites por construir caminos, poblados y ciudades antes que tus oponentes.', (SELECT id FROM categoria WHERE nombre='Juegos de Mesa'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P015', 'Carcassonne', 24990, 'https://home.ripley.cl/store/Attachment/WOP/D175/2000370634407/2000370634407-1.jpg', 9, 'Juego de mesa clásico de colocación de fichas donde los jugadores van creando el mapa de la región francesa medieval de Carcasona con caminos, monasterios y ciudades.', (SELECT id FROM categoria WHERE nombre='Juegos de Mesa'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P016', 'Mouse Gamer Hp G100 Iluminacion Led Azul Color Negro', 12350, 'https://http2.mlstatic.com/D_NQ_NP_894622-MLA106036056946_022026-O.webp', 25, 'Mouse de diseño ambidiestro con sensor óptico de DPI ajustable rápidamente (800 / 1200 / 2000 DPI). Incluye iluminación LED fija en tono azul neón.', (SELECT id FROM categoria WHERE nombre='Mouse'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P017', 'Mouse Pad Gamer Antideslizante XL TOGO', 10000, 'https://cdnx.jumpseller.com/gti-electronica/image/30266002/resize/640/640?1671113507', 10, 'Mousepad extendido de tamaño XL ideal para albergar tanto teclado mecánico como mouse. Bordes costurados de alta resistencia que previenen el deshilachado y base de goma antideslizante.', (SELECT id FROM categoria WHERE nombre='Mousepad'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P018', 'Polera Personalizada DTF Full Color', 13000, 'https://cdnx.jumpseller.com/gyrografik/image/47666484/Polera-personalizada-DTF-NEGRO02.png?1713158059', 15, 'Polera 100% algodón de excelente gramaje estampada mediante técnica DTF de alta definición. Colores vibrantes y gran durabilidad al lavado.', (SELECT id FROM categoria WHERE nombre='Poleras Personalizadas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P019', 'Polera Personalizada Diseño Cartoon', 10990, 'https://http2.mlstatic.com/D_NQ_NP_2X_735652-MLC93437368874_092025-F-polera-personalizada-diseno-cartoon-amor-estampado-pareja.webp', 13, 'Polera con estampado artístico de temática anime / cartoon gamer. Tela suave y fresca, confeccionada con materiales de alta calidad.', (SELECT id FROM categoria WHERE nombre='Poleras Personalizadas'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P020', 'Polerón Cyberpunk 2077 Gamer Futurista Ps4', 30900, 'https://http2.mlstatic.com/D_NQ_NP_2X_858072-MLC74429085870_022024-F-poleron-cyberpunk-2077-gamer-futurista-ps4-cdprojektred.webp', 17, 'Polerón afelpado con gorro e inspiraciones estéticas futuristas de Cyberpunk 2077. Costuras reforzadas, ideal para mantenerse abrigado con un estilo gamer moderno.', (SELECT id FROM categoria WHERE nombre='Polerones Gamers Personalizados'));

INSERT INTO producto (codigo, nombre, precio, imagen, stock, descripcion, categoria_id) VALUES
('P021', 'Polerón Niño Super Mario Bros Videojuegos', 20890, 'https://cdnx.jumpseller.com/grafimax/image/58426557/thumb/430/573?1752511309', 20, 'Polerón infantil térmico con estampado frontal de Super Mario Bros. Confección suave en franela de algodón pensada para la comodidad de los más pequeños.', (SELECT id FROM categoria WHERE nombre='Polerones Gamers Personalizados'));

-- ---------- USUARIOS DE PRUEBA (claves con BCrypt) ----------
-- admin@levelup.cl     / Admin123.
-- vendedor@levelup.cl  / Vendedor123.
-- comprador@levelup.cl / Comprador123.
-- katrina@duocuc.cl    / Katrina123. (Correo institucional para probar el descuento de estudio del 20%)
INSERT INTO usuario (nombre, apellido, apodo, fecha_nacimiento, correo, clave, avatar, rol) VALUES
('Gerencia LEVEL-UP', 'Administrador', 'Admin', '1990-01-01', 'admin@levelup.cl', '$2b$10$mZClojcP340DJyUCQmOpjON4TIj7zPcyHGaxytKUTehZ8./EawgIK', '', 'ADMIN');
INSERT INTO usuario (nombre, apellido, apodo, fecha_nacimiento, correo, clave, avatar, rol) VALUES
('Personal LEVEL-UP', 'Vendedor', 'Vendedor', '1995-06-15', 'vendedor@levelup.cl', '$2b$10$UNl4dNAwVao4z.PKzUNsruSTw4uPsl4hO6ty5BgM.1zgxdximKjuq', '', 'VENDEDOR');
INSERT INTO usuario (nombre, apellido, apodo, fecha_nacimiento, correo, clave, avatar, rol) VALUES
('Cliente LEVEL-UP', 'Comprador', 'Comprador', '2000-03-10', 'comprador@levelup.cl', '$2b$10$SJT7eiYKDLJcukDsT5TrduPSzTCXUqfc3HL4OwZfOyC/SJGwOChM2', '', 'COMPRADOR');
INSERT INTO usuario (nombre, apellido, apodo, fecha_nacimiento, correo, clave, avatar, rol) VALUES
('Katrina Salas', 'Duoc', 'Katrina', '2003-11-25', 'katrina@duocuc.cl', '$2b$10$wFumGrS2e248kwAh8jiD4eywMhbUYD8vr3uYKI8nYl4tJUv0K40wm', '', 'COMPRADOR');

-- ---------- RESEÑAS DE EJEMPLO (con autoría de usuario) ----------
-- La de ejemplo que mostraba la tienda + dos más
INSERT INTO resena (usuario_id, producto_codigo, puntuacion, comentario, fecha) VALUES
((SELECT id FROM usuario WHERE correo='admin@levelup.cl'), 'P004', 5, 'Excelente consola, corre todos los títulos en 4K sin problemas. La entrega fue rápida y el producto llegó sellado.', '2026-09-05'),
((SELECT id FROM usuario WHERE correo='comprador@levelup.cl'), 'P001', 5, 'Excelente rendimiento en juegos, corren todos los títulos en ultra sin problemas.', '2026-09-12'),
((SELECT id FROM usuario WHERE correo='katrina@duocuc.cl'), 'P014', 4, 'Muy bueno, aunque la caja venía un poco golpeada. El juego es igual de adictivo que siempre.', '2026-10-03');
