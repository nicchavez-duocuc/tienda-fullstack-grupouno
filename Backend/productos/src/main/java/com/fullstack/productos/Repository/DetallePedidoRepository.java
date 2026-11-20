package com.fullstack.productos.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.DetallePedido;
import com.fullstack.productos.dto.VentaVendedorDTO;

@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {

    // Los detalles de un pedido, con el producto (y su categoría) cargados
    @Query("SELECT d FROM DetallePedido d LEFT JOIN FETCH d.producto p LEFT JOIN FETCH p.categoria WHERE d.pedido.id = ?1")
    List<DetallePedido> listarConProducto(Long pedidoId);

    // Historial de ventas confirmadas (estado <> PENDIENTE) de los productos de un vendedor
    @Query("""
        SELECT new com.fullstack.productos.dto.VentaVendedorDTO(
            p.id,
            p.estado,
            p.fecha,
            prod.codigo,
            prod.nombre,
            d.cantidad,
            d.precioUnitario,
            u.id,
            u.nombre,
            u.correo
        )
        FROM DetallePedido d
        JOIN d.pedido p
        JOIN d.producto prod
        JOIN p.usuario u
        WHERE prod.idVendedor = :idVendedor
          AND p.estado <> 'PENDIENTE'
        ORDER BY p.fecha DESC
    """)
    List<VentaVendedorDTO> listarVentasPorVendedor(@Param("idVendedor") Integer idVendedor);
}