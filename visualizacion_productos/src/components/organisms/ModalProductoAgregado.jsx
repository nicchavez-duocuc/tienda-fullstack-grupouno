// ORGANISMO: ModalProductoAgregado
// Modal de confirmación que sale al añadir un producto al carrito.
// "agregado" es null (cerrado) o { producto, precio } con el precio que paga
// este usuario.

import Boton from "../atoms/Boton.jsx";
import Enlace from "../atoms/Enlace.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Precio from "../atoms/Precio.jsx";
import Texto from "../atoms/Texto.jsx";
import Titulo from "../atoms/Titulo.jsx";
import EncabezadoModal from "../molecules/EncabezadoModal.jsx";
import PieModal from "../molecules/PieModal.jsx";
import VentanaModal from "../molecules/VentanaModal.jsx";

export default function ModalProductoAgregado({ agregado, onCerrar }) {
    if (!agregado) return null;

    return (
        <VentanaModal>
            <EncabezadoModal titulo="✅ Producto agregado al carro" colorTitulo="#39FF14" onCerrar={onCerrar} />

            <div className="modal-body">
                <Imagen src={agregado.producto.imagen} alt={agregado.producto.nombre} />
                <div className="modal-details">
                    <Titulo>{agregado.producto.nombre}</Titulo>
                    <Texto className="modal-price">
                        <Precio valor={agregado.precio} />
                    </Texto>
                </div>
            </div>

            <PieModal>
                <Boton className="btn-seguir" onClick={onCerrar}>
                    Seguir comprando
                </Boton>
                <Enlace href="../carrito/carrito.html" className="btn-ir-carro">
                    Ir al carro
                </Enlace>
            </PieModal>
        </VentanaModal>
    );
}
