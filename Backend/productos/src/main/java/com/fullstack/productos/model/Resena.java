package com.fullstack.productos.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Entidad de la tabla "resena". Cada reseña la escribió un usuario sobre un
// producto (con primera autoría): un usuario puede reseñar cada producto 1 vez
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "resena", uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "producto_codigo"}))
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // El autor (usuario) de la reseña
    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // El producto que se reseña
    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_codigo", nullable = false)
    private Producto producto;

    // Calificación de 1 a 5
    @NotNull
    @Min(1)
    @Max(5)
    @Column(name = "puntuacion", nullable = false)
    private Integer puntuacion;

    @NotBlank
    @Column(name = "comentario", nullable = false, length = 500)
    private String comentario;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
}
