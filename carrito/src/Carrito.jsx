import { useState, useEffect } from "react";
import {
    obtenerClaveCarrito,
    esUsuarioDuoc,
    leerCarrito,
    guardarCarrito,
    calcularPrecios,
    registrarCompraEnHistorial
} from "./utils.js";

export default function Carrito() {
    const [carrito, setCarrito] = useState(leerCarrito);
    const [modal, setModal] = useState(null);

    const esDuoc = esUsuarioDuoc();

    // Sincroniza en tiempo real si el carrito cambia en otra pestaña/componente
    useEffect(() => {
        function alCambiarStorage(e) {
            const claveActual = obtenerClaveCarrito();
            if (e.key === claveActual || e.key === null) {
                setCarrito(leerCarrito());
            }
        }
        window.addEventListener("storage", alCambiarStorage);
        return () => window.removeEventListener("storage", alCambiarStorage);
    }, []);

    // Recalcula el total acumulado
    const total = carrito.reduce((acumulado, producto) => {
        const { precioFinal } = calcularPrecios(producto, esDuoc);
        return acumulado + (precioFinal * (Number(producto.cantidad) || 1));
    }, 0);

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
        if (producto.cantidad > 1) {
            actualizar(
                carrito.map((p) => (p.codigo === codigo ? { ...p, cantidad: p.cantidad - 1 } : p))
            );
        } else {
            eliminarDelCarrito(codigo);
        }
    }

    // Modal helpers
    function abrirModal(config) {
        setModal(config);
    }

    function cerrarModal() {
        setModal(null);
    }

    function vaciarCarrito() {
        if (carrito.length === 0) {
            abrirModal({
                mensaje: "Tu carrito ya está vacío.",
                icono: "🛒",
                textoBoton: "Entendido",
                colorFondo: "#1E90FF",
                colorTexto: "white",
                esAlerta: true
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
            tipoAccion: "VACIAR"
        });
    }

    function procederPago() {
        if (carrito.length === 0) {
            abrirModal({
                mensaje: "No tienes productos en tu carrito para comprar.",
                icono: "🛒",
                textoBoton: "Entendido",
                colorFondo: "#1E90FF",
                colorTexto: "white",
                esAlerta: true
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
            tipoAccion: "PAGAR"
        });
    }

    // Ejecuta la confirmación del modal garantizando el estado 'carrito' fresco y actualizado
    function ejecutarAccionModal() {
        if (!modal) return;
        const tipo = modal.tipoAccion;
        cerrarModal();

        if (tipo === "VACIAR") {
            const clave = obtenerClaveCarrito();
            localStorage.removeItem(clave);
            setCarrito([]);
        } else if (tipo === "PAGAR") {
            // 1. Guardar en el historial usando el estado fresco de carrito y total
            const guardadoExitoso = registrarCompraEnHistorial(carrito, total);

            if (guardadoExitoso) {
                // 2. Limpiar el carrito activo solo tras confirmar guardado
                const claveCarro = obtenerClaveCarrito();
                localStorage.removeItem(claveCarro);
                setCarrito([]);

                // 3. Notificación de éxito
                setTimeout(() => {
                    abrirModal({
                        mensaje: "¡Pago procesado con éxito! Gracias por elegir LEVEL-UP GAMER.",
                        icono: "✅",
                        textoBoton: "Genial",
                        colorFondo: "#39FF14",
                        colorTexto: "black",
                        esAlerta: true
                    });
                }, 100);
            } else {
                alert("Ocurrió un error al procesar el pago. Por favor intenta nuevamente.");
            }
        }
    }

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
                                onClick={ejecutarAccionModal}
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