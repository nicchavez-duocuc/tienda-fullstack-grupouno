package com.fullstack.productos.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Entidad de la tabla "producto". El código (P001, P002...) sigue siendo la
// clave primaria, igual que ahora. La categoría es una FK a categoria.id
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto")
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

    // FK: cada producto pertenece a una categoría
    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

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
