-- V4: Garantiza que cada usuario tenga como maximo UN carrito (pedido
-- PENDIENTE). Hasta ahora "buscar o crear carrito" podia, si dos peticiones
-- llegaban al mismo tiempo (doble clic, doble carga de la pagina), crear DOS
-- carritos PENDIENTES para el mismo usuario; como la busqueda esperaba un solo
-- resultado, todo el carrito de ese usuario quedaba rompido (error 500).
--
-- La correccion es doble:
--   1. Limpieza de duplicados ya existentes.
--   2. Una columna generada + indice UNIQUE: la BASE DE DATOS rechaza de
--      raiz un segundo carrito PENDIENTE del mismo usuario (MySQL 8 y
--      MariaDB 10.4+ soportan columnas generadas e indices sobre ellas).

-- ---------- 1) Limpieza de duplicados ya existentes ----------

-- a) Si un usuario tiene varios carritos, primero se borran los VACIOS
--    que no sean el mas antiguo (el mas antiguo es el "oficial")
DELETE p1 FROM pedido p1
JOIN pedido p2
  ON p1.usuario_id = p2.usuario_id
 AND p1.estado = 'PENDIENTE' AND p2.estado = 'PENDIENTE'
 AND p1.id > p2.id
WHERE NOT EXISTS (SELECT 1 FROM detalle_pedido d WHERE d.pedido_id = p1.id);

-- b) Si aun quedan duplicados (los dos con items, caso raro de una carrera),
--    se conserva el mas antiguo y se borra el resto
DELETE p1 FROM pedido p1
JOIN pedido p2
  ON p1.usuario_id = p2.usuario_id
 AND p1.estado = 'PENDIENTE' AND p2.estado = 'PENDIENTE'
 AND p1.id > p2.id;

-- ---------- 2) Un solo carrito PENDIENTE por usuario ----------

-- carrito_de_usuario = usuario_id SOLO cuando el pedido esta PENDIENTE
-- (es el carrito); en PAGADO/CANCELADO queda NULL. Los UNIQUE permiten
-- infinitos NULL, asi que solo se hace cumplir para los carritos.
ALTER TABLE pedido
    ADD COLUMN carrito_de_usuario BIGINT
        GENERATED ALWAYS AS (CASE WHEN estado = 'PENDIENTE' THEN usuario_id END) VIRTUAL,
    ADD CONSTRAINT uq_pedido_carrito_por_usuario UNIQUE (carrito_de_usuario),
    ADD INDEX idx_pedido_usuario_estado (usuario_id, estado);
