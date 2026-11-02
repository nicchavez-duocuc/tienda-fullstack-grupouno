// MOLÉCULA: EncabezadoModal
// Franja superior de un modal: el título (con el color que se le pase) y la
// ✕ para cerrarlo.

import Boton from "../atoms/Boton.jsx";
import Titulo from "../atoms/Titulo.jsx";

export default function EncabezadoModal({ titulo, colorTitulo, onCerrar }) {
    return (
        <div className="modal-header">
            <Titulo nivel={3} estilo={{ color: colorTitulo }}>
                {titulo}
            </Titulo>
            <Boton className="close-modal" onClick={onCerrar}>
                ✕
            </Boton>
        </div>
    );
}
