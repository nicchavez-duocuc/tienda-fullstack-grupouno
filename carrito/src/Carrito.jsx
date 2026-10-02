// Reemplaza TODO script_carrito.js:
//   cargarCarrito(), eliminarDelCarrito(), aumentarCantidad(), disminuirCantidad(),
//   vaciarCarrito(), procederPago(), y el sistema del modal
//   (abrirModalConfirmacion, cerrarModalConfirmacion, ejecutarAccion, accionPendiente).
// Y reemplaza en carrito.html: #cart-container, .cart-summary y #modal-confirmacion.
// Se conservan exactamente las mismas clases CSS, así estilo_carrito.css no cambia.

import { useState, useEffect } from "react";
import {
    CLAVE_CARRITO,
    esUsuarioDuoc,
    leerCarrito,
    guardarCarrito,
    calcularPrecios
} from "./utils.js";

export default function Carrito() {
    // El carrito vive en estado de React. Se inicializa UNA vez leyendo localStorage.
    const [carrito, setCarrito] = useState(leerCarrito);

    // Reemplaza a la variable global "accionPendiente" y a los innerText/style del modal:
    // null = modal cerrado; un objeto = modal abierto con esa configuración.
    const [modal, setModal] = useState(null);

    const esDuoc = esUsuarioDuoc();

    // Si el carrito cambia en OTRA pestaña (por ejemplo agregas algo en la tienda),
    // el navegador dispara el evento "storage" y aquí refrescamos el estado.
    // Sin esto, esta pestaña podría pisar con datos viejos lo que agregaste en la tienda.
    useEffect(() => {
        function alCambiarStorage(e) {
            if (e.key === CLAVE_CARRITO || e.key === null) {
                setCarrito(leerCarrito());
            }
        }
        window.addEventListener("storage", alCambiarStorage);
        return () => window.removeEventListener("storage", alCambiarStorage);
    }, []);

    // El total NO es un estado aparte: se calcula a partir del carrito en cada render,
    // así nunca puede quedar desincronizado (antes había que acordarse de actualizarlo).
    const total = carrito.reduce((acumulado, producto) => {
        const { precioFinal } = calcularPrecios(producto, esDuoc);
        return acumulado + precioFinal * producto.cantidad;
    }, 0);

    // ---------- Acciones sobre el carrito ----------

    // Actualiza la pantalla (estado) y guarda en localStorage en un solo paso
    function actualizar(nuevoCarrito) {
        setCarrito(nuevoCarrito);
        guardarCarrito(nuevoCarrito);
    }

    function aumentarCantidad(codigo) {
        actualizar(
            carrito.map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad + 1 } : p))
        );
    }

    function eliminarDelCarrito(codigo) {
        actualizar(carrito.filter((p) => p.codigo !== codigo));
    }

    function disminuirCantidad(codigo) {
        const producto = carrito.find((p) => p.codigo === codigo);
        if (!producto) return;
        // Igual que antes: si queda 1 y aprietas "-", se elimina del carrito
        if (producto.cantidad > 1) {
            actualizar(
                carrito.map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad - 1 } : p))
            );
        } else {
            eliminarDelCarrito(codigo);
        }
    }

    // ---------- Modal de confirmación ----------

    function abrirModal(config) {
        setModal(config);
    }

    function cerrarModal() {
        setModal(null);
    }

    function confirmarModal() {
        const accion = modal ? modal.accion : null;
        // Primero cerramos y DESPUÉS ejecutamos la acción: así, si la acción abre otro
        // modal (el de "Pago exitoso"), ese segundo modal es el que queda visible.
        cerrarModal();
        if (accion) accion();
    }

    // ---------- Botones de abajo ----------

    function vaciarCarrito() {
        if (carrito.length === 0) {
            abrirModal({
                mensaje: "Tu carrito ya está vacío. ¡Ve a la tienda a buscar algo genial!",
                icono: "🛒",
                textoBoton: "Entendido",
                colorFondo: "#1E90FF",
                colorTexto: "white",
                esAlerta: true,
                accion: null
            });
            return;
        }

        abrirModal({
            mensaje: "¿Confirmas que quieres vaciar tu carro de compras?",
            icono: "⚠️",
            textoBoton: "Vaciar Carrito",
            colorFondo: "#ff3333",
            colorTexto: "white",
            esAlerta: false,
            accion: () => {
                localStorage.removeItem(CLAVE_CARRITO);
                setCarrito([]);
            }
        });
    }

    function procederPago() {
        if (carrito.length === 0) {
            abrirModal({
                mensaje: "No tienes productos en tu carrito. ¡Agrega algunos antes de comprar!",
                icono: "🛒",
                textoBoton: "Entendido",
                colorFondo: "#1E90FF",
                colorTexto: "white",
                esAlerta: true,
                accion: null
            });
            return;
        }

        abrirModal({
            mensaje: "¿Confirmas que deseas proceder con el pago de tus productos?",
            icono: "💳",
            textoBoton: "Comprar",
            colorFondo: "#39FF14",
            colorTexto: "black",
            esAlerta: false,
            accion: () => {
                localStorage.removeItem(CLAVE_CARRITO);
                setCarrito([]);
                abrirModal({
                    mensaje: "¡Pago procesado con éxito! Gracias por elegir LEVEL-UP GAMER.",
                    icono: "✅",
                    textoBoton: "Genial",
                    colorFondo: "#39FF14",
                    colorTexto: "black",
                    esAlerta: true,
                    accion: null
                });
            }
        });
    }

    // ---------- Dibujo en pantalla ----------

    return (
        <>
            <div id="cart-container">
                {carrito.length === 0 ? (
                    <p style={{ textAlign: "center", padding: 20 }}>
                        Tu carrito está vacío. ¡Ve a la tienda a buscar algo genial!
                    </p>
                ) : (
                    carrito.map((producto) => {
                        const { precioBase, precioFinal } = calcularPrecios(producto, esDuoc);
                        const subtotal = precioFinal * producto.cantidad;

                        return (
                            <div className="cart-item" key={producto.codigo}>
                                <img src={producto.imagen} alt={producto.nombre} />

                                <div className="item-details">
                                    <h4 style={{ color: "#39FF14" }}>{producto.nombre}</h4>

                                    {esDuoc ? (
                                        <p>
                                            Precio Unitario:{" "}
                                            <span style={{ textDecoration: "line-through", color: "#aaa" }}>
                                                ${precioBase.toLocaleString("es-CL")}
                                            </span>{" "}
                                            <strong style={{ color: "#39FF14" }}>
                                                ${precioFinal.toLocaleString("es-CL")} (20% OFF)
                                            </strong>
                                        </p>
                                    ) : (
                                        <p>Precio Unitario: ${precioFinal.toLocaleString("es-CL")}</p>
                                    )}

                                    <p style={{ marginTop: 5 }}>
                                        Subtotal: <strong>${subtotal.toLocaleString("es-CL")}</strong>
                                    </p>
                                </div>

                                <div className="quantity-controls">
                                    <button
                                        type="button"
                                        className="btn-qty"
                                        onClick={() => disminuirCantidad(producto.codigo)}
                                    >
                                        -
                                    </button>
                                    <span className="qty-display">{producto.cantidad}</span>
                                    <button
                                        type="button"
                                        className="btn-qty"
                                        onClick={() => aumentarCantidad(producto.codigo)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="btn-remove"
                                    onClick={() => eliminarDelCarrito(producto.codigo)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="cart-summary">
                <h3>
                    Total a pagar: $<span id="cart-total">{total.toLocaleString("es-CL")}</span>
                </h3>
                <button type="button" className="btn-vaciar" onClick={vaciarCarrito}>
                    Vaciar Carrito
                </button>
                <button type="button" className="btn-pagar" onClick={procederPago}>
                    Proceder al Pago
                </button>
            </div>

            {/* El modal solo existe en pantalla cuando "modal" tiene datos */}
            {modal && (
                <div className="modal-overlay" style={{ display: "flex" }}>
                    <div className="modal-confirm-content">
                        <button type="button" className="close-modal" onClick={cerrarModal}>
                            ✕
                        </button>
                        <div className="modal-icon">{modal.icono}</div>
                        <h3 style={{ color: "white", marginBottom: 20 }}>{modal.mensaje}</h3>

                        <div className="modal-actions">
                            {!modal.esAlerta && (
                                <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                                    Cancelar
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn-accion"
                                style={{ backgroundColor: modal.colorFondo, color: modal.colorTexto }}
                                onClick={confirmarModal}
                            >
                                {modal.textoBoton}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
