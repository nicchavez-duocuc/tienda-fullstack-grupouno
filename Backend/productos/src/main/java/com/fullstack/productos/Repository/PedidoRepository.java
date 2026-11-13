package com.fullstack.productos.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // El carrito del usuario = su pedido con estado PENDIENTE
    Optional<Pedido> findByUsuarioIdAndEstado(Long usuarioId, String estado);

    // Todos los pedidos (para el vendedor y el administrador), del más nuevo al más viejo
    List<Pedido> findAllByOrderByFechaDesc();

    // Pedidos con sus detalles cargados (para el listado del panel)
    @Query("SELECT DISTINCT p FROM Pedido p LEFT JOIN FETCH p.usuario WHERE p.estado <> 'PENDIENTE' ORDER BY p.fecha DESC")
    List<Pedido> listarComprasConUsuario();
}
