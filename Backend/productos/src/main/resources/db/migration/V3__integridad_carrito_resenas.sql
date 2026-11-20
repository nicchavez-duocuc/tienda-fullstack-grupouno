-- V3: Reglas de integridad para el carrito (pedido y detalle_pedido), las
-- reseñas y el stock de productos.
--
-- Las tablas ya existen desde V1; acá NO se edita V1: se agregan restricciones
-- CHECK que refuerzan en la base de datos las mismas validaciones que el
-- backend hace con Bean Validation (por ejemplo @Min(1) en cantidad y
-- @Min(1)/@Max(5) en la puntuacion de la resena). Así los datos quedan
-- consistentes aunque alguien escriba directo en la BD.
--
-- Requisito de version: MySQL 8.0.16+ y MariaDB 10.2+ hacen cumplir las
-- restricciones CHECK (Laragon y las versiones actuales de MariaDB cumplen).

-- ---------- CARRITO (pedido + detalle_pedido) ----------

-- Solo existen los tres estados que maneja el backend (Pedido.java)
ALTER TABLE pedido
    ADD CONSTRAINT chk_pedido_estado CHECK (estado IN ('PENDIENTE', 'PAGADO', 'CANCELADO'));

-- El total del pedido nunca puede quedar negativo
ALTER TABLE pedido
    ADD CONSTRAINT chk_pedido_total CHECK (total >= 0);

-- El backend valida @Min(1) en ItemCarritoSolicitud: mismo piso en la BD
ALTER TABLE detalle_pedido
    ADD CONSTRAINT chk_detalle_cantidad CHECK (cantidad >= 1);

-- El precio unitario guardado es el precio ORIGINAL del producto (sin descuento)
ALTER TABLE detalle_pedido
    ADD CONSTRAINT chk_detalle_precio CHECK (precio_unitario >= 0);

-- ---------- STOCK ----------

-- Al finalizar la compra se descuenta stock; nunca deberia bajar de cero
ALTER TABLE producto
    ADD CONSTRAINT chk_producto_stock CHECK (stock >= 0);

-- ---------- RESEÑAS ----------

-- La puntuacion es de 1 a 5 (ResenaSolicitud: @Min(1) @Max(5))
ALTER TABLE resena
    ADD CONSTRAINT chk_resena_puntuacion CHECK (puntuacion BETWEEN 1 AND 5);
