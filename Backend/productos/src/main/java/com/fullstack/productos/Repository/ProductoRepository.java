package com.fullstack.productos.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstack.productos.model.Producto;



@Repository
public interface ProductoRepository extends JpaRepository<Producto , String> { 
   
    //busqueda personalizada
    Optional<Producto> findByCodigo(String codigo);
}
