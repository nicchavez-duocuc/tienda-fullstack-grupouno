package com.fullstack.productos.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
}
