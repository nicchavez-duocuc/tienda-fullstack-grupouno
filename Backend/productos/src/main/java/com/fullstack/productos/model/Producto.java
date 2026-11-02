package com.fullstack.productos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "productos")
public class Producto {

    @NotBlank
    @Id
    @Column(length = 15, nullable = false)
    private String codigo;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String nombre;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Long precio;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String categoria;

    @NotBlank
    @Column(length = 500, nullable = false)
    private String imagen;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Long stock;

    @Column(length = 1000)
    private String descripcion;
}