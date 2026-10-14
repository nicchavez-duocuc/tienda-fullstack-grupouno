// ORGANISMO: ModalConfirmacion
// Ventana emergente del carrito. "modal" es null (cerrado) o un objeto con:
// icono, mensaje, textoBoton, colorFondo, colorTexto y esAlerta.

import Boton from "../atoms/Boton.jsx";
import Icono from "../atoms/Icono.jsx";
import Titulo from "../atoms/Titulo.jsx";
import AccionesModal from "../molecules/AccionesModal.jsx";

export default function ModalConfirmacion({ modal, onCerrar, onConfirmar }) {
    if (!modal) return null;

    return (
        <div className="modal-overlay" style={{ display: "flex" }}>
            <div className="modal-confirm-content">
                <Boton className="close-modal" onClick={onCerrar}>
                    ✕
                </Boton>
                <Icono className="modal-icon" simbolo={modal.icono} />
                <Titulo nivel={3} estilo={{ color: "white", marginBottom: 20 }}>
                    {modal.mensaje}
                </Titulo>
                <AccionesModal
                    esAlerta={modal.esAlerta}
                    textoBoton={modal.textoBoton}
                    colorFondo={modal.colorFondo}
                    colorTexto={modal.colorTexto}
                    onCancelar={onCerrar}
                    onConfirmar={onConfirmar}
                />
            </div>
        </div>
    );
}
