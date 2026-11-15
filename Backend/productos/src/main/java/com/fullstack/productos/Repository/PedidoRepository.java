package com.fullstack.productos.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // El carrito del usuario = su pedido con estado PENDIENTE.
    // findFirst (en vez de un unico resultado): si en una base de datos antigua
    // quedaran dos carritos PENDIENTES para el mismo usuario, se toma el mas
    // antiguo en lugar de lanzar NonUniqueResultException (que rompia todo el
    // carrito con un error 500). El indice unico de la migracion V4 evita que
    // se creen duplicados nuevos.
    Optional<Pedido> findFirstByUsuarioIdAndEstadoOrderByIdAsc(Long usuarioId, String estado);

    // Todos los pedidos (para el vendedor y el administrador), del más nuevo al más viejo
    List<Pedido> findAllByOrderByFechaDesc();

    // Pedidos con sus detalles cargados (para el listado del panel)
    @Query("SELECT DISTINCT p FROM Pedido p LEFT JOIN FETCH p.usuario WHERE p.estado <> 'PENDIENTE' ORDER BY p.fecha DESC")
    List<Pedido> listarComprasConUsuario();
}
