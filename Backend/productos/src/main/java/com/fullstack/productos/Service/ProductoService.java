package com.fullstack.productos.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;//Importante para errores relacionados con la base de datos
import org.springframework.stereotype.Service;

import com.fullstack.productos.model.Producto;
import com.fullstack.productos.Repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Guardar
    public Optional<Producto> guardarProducto(Producto producto) {
        try {
            
            Optional<Producto> existe = productoRepository.findByCodigo(producto.getCodigo());
            
            if (existe.isPresent()) { 
                return Optional.empty();
            }
            
            
            return Optional.of(productoRepository.save(producto));//Aqui es cuando llenamos la caja y la enviamos

        } catch (DataAccessException e) {
            
            System.err.println("Error de base de datos al intentar guardar el producto: " + e.getMessage());
            throw new RuntimeException("Error interno al guardar en la base de datos");

        } catch (Exception e) {

            System.err.println("Error inesperado: " + e.getMessage());
            throw new RuntimeException("Error inesperado en el servidor");

        }
    }

    // Buscar por codigo
    public Optional<Producto> buscarPorCodigo(String codigo) {
        try {
            return productoRepository.findByCodigo(codigo);
        } catch (Exception e) {
            System.err.println("Error al buscar producto por codigo: " + e.getMessage());
            throw new RuntimeException("Error al consultar la base de datos");
        }
    }

    // Actualizar
    public Producto actualizarProducto(String codigo, Producto datosNuevos) {
        
        if (datosNuevos == null) {
            throw new IllegalArgumentException("Los datos no pueden ser nulos.");
        }

        if (datosNuevos.getNombre() == null || datosNuevos.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio.");
        }

        if (datosNuevos.getStock() == null ) {
            throw new IllegalArgumentException("El Stock es obligatorio.");
        }

        if (datosNuevos.getPrecio() == null ) {
            throw new IllegalArgumentException("El Precio es obligatorio.");
        }

        if (datosNuevos.getCategoria() == null || datosNuevos.getCategoria().trim().isEmpty()){
            throw new IllegalArgumentException("La Categoria es obligatorio.");
        }

        if (datosNuevos.getImagen() == null || datosNuevos.getImagen().trim().isEmpty()){
            throw new IllegalArgumentException("La Imagen es obligatorio.");
        }

        if (datosNuevos.getDescripcion() == null || datosNuevos.getDescripcion().trim().isEmpty()){
            throw new IllegalArgumentException("La Descripcion es obligatorio.");
        }
     




        try {
            Producto productoEnBD = productoRepository.findByCodigo(codigo).orElse(null);

            if (productoEnBD != null) {
                productoEnBD.setNombre(datosNuevos.getNombre());
                productoEnBD.setStock(datosNuevos.getStock());
                productoEnBD.setPrecio(datosNuevos.getPrecio());
                productoEnBD.setCategoria(datosNuevos.getCategoria());
                productoEnBD.setImagen(datosNuevos.getImagen());
                productoEnBD.setDescripcion(datosNuevos.getDescripcion());
                
                return productoRepository.save(productoEnBD);
            } else {
                return null; 
            }
        } catch (DataAccessException e) {
            System.err.println("Error de base de datos al actualizar: " + e.getMessage());
            throw new RuntimeException("Error interno al actualizar los datos");
        }
    }


    // Eliminar por codigo
    public boolean eliminarProductoPorCodigo(String codigo) {

        try {
            
            Producto productoExistente = productoRepository.findByCodigo(codigo).orElse(null);

            if (productoExistente != null) {
                
                productoRepository.delete(productoExistente);
                return true;
            } else {
                
                return false;
            }
        } catch (DataAccessException e) {
            System.err.println("Error al intentar eliminar producto en la BD: " + e.getMessage());
            throw new RuntimeException("No se puede eliminar el producto porque está en uso o la BD falló");
        }
    }
}