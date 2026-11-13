package com.fullstack.productos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Entidad de la tabla "detalle_pedido". Une pedido (del usuario) y producto:
// guarda cuántas unidades de cada producto hay en un pedido y a qué precio
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "detalle_pedido", uniqueConstraints = @UniqueConstraint(columnNames = {"pedido_id", "producto_codigo"}))
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // El detalle pertenece a un pedido.
    // @JsonIgnore rompe el ciclo JSON pedido -> detalles -> pedido -> ... y
    // evita que la respuesta al frontend se vuelva infinita
    @ManyToOne(optional = false)
    @JoinColumn(name = "pedido_id", nullable = false)
    @JsonIgnore
    private Pedido pedido;

    // El detalle apunta a un producto
    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_codigo", nullable = false)
    private Producto producto;

    // Precio EN CL del producto al momento de agregar (precio de precio unitario)
    @NotNull
    @Column(name = "precio_unitario", nullable = false)
    private Long precioUnitario;

    @NotNull
    @Min(1)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
}
