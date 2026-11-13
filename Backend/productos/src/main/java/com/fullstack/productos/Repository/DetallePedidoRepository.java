package com.fullstack.productos.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.DetallePedido;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {

    // Los detalles de un pedido, con el producto (y su categoría) cargados
    @Query("SELECT d FROM DetallePedido d LEFT JOIN FETCH d.producto p LEFT JOIN FETCH p.categoria WHERE d.pedido.id = ?1")
    List<DetallePedido> listarConProducto(Long pedidoId);
}
