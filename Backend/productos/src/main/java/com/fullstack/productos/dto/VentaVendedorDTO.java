package com.fullstack.productos.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VentaVendedorDTO {

    private Long pedidoId;
    private String estadoPedido;
    private LocalDateTime fechaCompra;
    private String productoCodigo;
    private String productoNombre;
    private Integer cantidad;
    private Long precioUnitario;
    private Long compradorId;
    private String compradorNombre;
    private String compradorCorreo;
}