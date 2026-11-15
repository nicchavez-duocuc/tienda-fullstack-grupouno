package com.fullstack.productos.Repository;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, String> {

    // Busca el producto Y su categoría en una sola consulta (evita consultas extra)
    @Query("SELECT p FROM Producto p LEFT JOIN FETCH p.categoria WHERE p.codigo = ?1")
    Optional<Producto> findByCodigoConCategoria(String codigo);

    // Lista completa con categoría cargada (para la tienda y el panel de admin)
    @Query("SELECT p FROM Producto p LEFT JOIN FETCH p.categoria")
    List<Producto> listarConCategoria();

    // Busqueda personalizada por codigo (original)
    Optional<Producto> findByCodigo(String codigo);

    // Igual que findByCodigo pero tomando un LOCK de escritura (SELECT ... FOR
    // UPDATE) sobre la fila del producto. Se usa al descontar stock en
    // finalizarCompra: si dos compras concurrentes tocaban el mismo producto,
    // ambas leían el stock original, ambas pasaban el chequeo y se vendía más
    // de lo que existía. Con el lock, la segunda compra espera a que la primera
    // confirme y lee el stock ya actualizado.
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Producto p WHERE p.codigo = :codigo")
    Optional<Producto> findByCodigoConLock(@Param("codigo") String codigo);
}
