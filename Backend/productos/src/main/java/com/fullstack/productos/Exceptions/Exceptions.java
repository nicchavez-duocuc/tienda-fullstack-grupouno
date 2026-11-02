package com.fullstack.productos.Exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice//Esto mantiene Atento al spring boot sobre los errores en el controlador
public class Exceptions {

    @ExceptionHandler(MethodArgumentNotValidException.class)//Atrapa al error que se genera en la validacion de los @ del Validate
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {

        //Se crea este diccionario como en python (clave:valor) para guardar bien los errores
        //en ejemplo seria "nombre de la variable : error este no puede estar vacio"
        Map<String, String> errores = new HashMap<>();
        
        //Recorremos todos los errores que ocurrieron
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            //Extraemo el nombre del campo que fallo
            String campo = ((FieldError) error).getField();
            //Extrae el mensaje especifico que pusimos dentro del @
            String mensaje = error.getDefaultMessage(); 
            
            //Metemos el nombre del campo del fallo y el mensaje
            errores.put(campo, mensaje);
        });
        //y aqui se lo retornamos al postman
        return ResponseEntity.badRequest().body(errores);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoResourceFoundException(NoResourceFoundException ex) {
        Map<String, String> error = new HashMap<>();
    
        // Tu mensaje personalizado
        error.put("error", "La ruta o link que intentas consultar no existe");
    
        // Si quieres, puedes mandar también el detalle técnico original que dice qué ruta falló
        error.put("detalle", ex.getMessage()); 
    
        // Retornamos 404
        return ResponseEntity.status(404).body(error);
    }
}