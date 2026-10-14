// PÁGINA: CarritoPage
// Conecta el carrito (useCarrito) y el modal (useModalConfirmacion) con las
// piezas visuales. Acá viven las dos decisiones propias de esta página:
// qué pasa al "Vaciar Carrito" y qué pasa al "Proceder al Pago"
// (reemplazan a vaciarCarrito() y procederPago() del script original).

import { useCarrito } from "../hooks/useCarrito.js";
import { useModalConfirmacion } from "../hooks/useModalConfirmacion.js";
import PlantillaCarrito from "../components/templates/PlantillaCarrito.jsx";
import ListaCarrito from "../components/organisms/ListaCarrito.jsx";
import ResumenCarrito from "../components/organisms/ResumenCarrito.jsx";
import ModalConfirmacion from "../components/organisms/ModalConfirmacion.jsx";

export default function CarritoPage() {
    const { items, total, esDuoc, aumentarCantidad, disminuirCantidad, eliminarDelCarrito, limpiarCarrito } =
        useCarrito();
    const { modal, abrirModal, cerrarModal, confirmarModal } = useModalConfirmacion();

    function vaciarCarrito() {
        if (items.length === 0) {
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
            accion: limpiarCarrito
        });
    }

    function procederPago() {
        if (items.length === 0) {
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
                limpiarCarrito();
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

    return (
        <PlantillaCarrito
            lista={
                <ListaCarrito
                    items={items}
                    esDuoc={esDuoc}
                    onAumentar={aumentarCantidad}
                    onDisminuir={disminuirCantidad}
                    onEliminar={eliminarDelCarrito}
                />
            }
            resumen={<ResumenCarrito total={total} onVaciar={vaciarCarrito} onPagar={procederPago} />}
            modal={<ModalConfirmacion modal={modal} onCerrar={cerrarModal} onConfirmar={confirmarModal} />}
        />
    );
}
