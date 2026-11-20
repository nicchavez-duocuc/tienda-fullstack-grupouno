-- Esquema inicial: usuario, categoria, producto, pedido, detalle_pedido, resena
-- SQL compatible con MySQL y MariaDB

CREATE TABLE usuario (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(50)  NOT NULL,
    apellido    VARCHAR(50)  NULL,
    apodo       VARCHAR(50)  NULL,
    fecha_nacimiento DATE     NULL,
    correo      VARCHAR(100) NOT NULL,
    clave       VARCHAR(100) NOT NULL,
    avatar      LONGTEXT     NULL,
    rol         VARCHAR(10)  NOT NULL,
    CONSTRAINT uq_usuario_correo UNIQUE (correo)
);

CREATE TABLE categoria (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200) NULL
);

CREATE TABLE producto (
    codigo        VARCHAR(15)  NOT NULL PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL,
    precio        BIGINT       NOT NULL,
    imagen        VARCHAR(500) NOT NULL,
    stock         BIGINT       NOT NULL,
    descripcion   VARCHAR(1000) NULL,
    categoria_id  BIGINT       NOT NULL,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria (id)
);

CREATE TABLE pedido (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  BIGINT      NOT NULL,
    estado      VARCHAR(10) NOT NULL,
    fecha       DATETIME(6) NOT NULL,
    total       BIGINT      NOT NULL,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

CREATE TABLE detalle_pedido (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_id       BIGINT      NOT NULL,
    producto_codigo VARCHAR(15) NOT NULL,
    precio_unitario BIGINT      NOT NULL,
    cantidad        INT         NOT NULL,
    CONSTRAINT uq_detalle_pedido_producto UNIQUE (pedido_id, producto_codigo),
    CONSTRAINT fk_detalle_pedido FOREIGN KEY (pedido_id) REFERENCES pedido (id) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto FOREIGN KEY (producto_codigo) REFERENCES producto (codigo)
);

CREATE TABLE resena (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id      BIGINT       NOT NULL,
    producto_codigo VARCHAR(15)  NOT NULL,
    puntuacion      INT          NOT NULL,
    comentario      VARCHAR(500) NOT NULL,
    fecha           DATE         NOT NULL,
    CONSTRAINT uq_resena_usuario_producto UNIQUE (usuario_id, producto_codigo),
    CONSTRAINT fk_resena_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    CONSTRAINT fk_resena_producto FOREIGN KEY (producto_codigo) REFERENCES producto (codigo)
);
