package com.fullstack.productos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

// Entidad de la tabla "usuario". El rol puede ser: ADMIN, VENDEDOR o COMPRADOR
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario", uniqueConstraints = @UniqueConstraint(columnNames = "correo"))
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "apellido", length = 50)
    private String apellido;

    @Column(name = "apodo", length = 50)
    private String apodo;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @NotBlank
    @Column(name = "correo", nullable = false, length = 100)
    private String correo;

    // La clave se guarda con BCrypt. Nunca sale en las respuestas JSON
    @NotBlank
    @Column(name = "clave", nullable = false, length = 100)
    @JsonIgnore
    private String clave;

    // El avatar se guarda como data URI base64 (puede ser largo), por eso LONGTEXT
    @Column(name = "avatar", columnDefinition = "LONGTEXT")
    private String avatar;

    // ADMIN = acceso total, VENDEDOR = solo visualizar productos y pedidos,
    // COMPRADOR = solo usar la tienda
    @NotBlank
    @Column(name = "rol", nullable = false, length = 10)
    private String rol;
}
