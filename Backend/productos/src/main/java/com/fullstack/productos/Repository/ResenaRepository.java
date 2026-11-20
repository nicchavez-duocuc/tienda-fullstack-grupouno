package com.fullstack.productos.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.Resena;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {

    // Todas las reseñas (con autor y producto en la misma consulta), del más nuevo al más viejo
    @Query("SELECT r FROM Resena r LEFT JOIN FETCH r.usuario u LEFT JOIN FETCH r.producto p ORDER BY r.fecha DESC, r.id DESC")
    List<Resena> listarConAutorYProducto();

    // Reseñas de un producto (.codigo), para el filtro de la tienda
    @Query("SELECT r FROM Resena r LEFT JOIN FETCH r.usuario u LEFT JOIN FETCH r.producto p WHERE p.codigo = ?1 ORDER BY r.fecha DESC, r.id DESC")
    List<Resena> listarPorProductoConAutor(String productoCodigo);

    // ¿El usuario ya reseñó este producto? (1 reseña por producto por usuario)
    boolean existsByUsuarioIdAndProductoCodigo(Long usuarioId, String productoCodigo);

    Optional<Resena> findByUsuarioIdAndProductoCodigo(Long usuarioId, String productoCodigo);
}
