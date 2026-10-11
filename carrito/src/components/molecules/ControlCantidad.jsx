// MOLÉCULA: ControlCantidad
// Botón "-", número de unidades y botón "+".

import Boton from "../atoms/Boton.jsx";
import Texto from "../atoms/Texto.jsx";

export default function ControlCantidad({ cantidad, onAumentar, onDisminuir }) {
    return (
        <div className="quantity-controls">
            <Boton className="btn-qty" onClick={onDisminuir}>
                -
            </Boton>
            <Texto como="span" className="qty-display">
                {cantidad}
            </Texto>
            <Boton className="btn-qty" onClick={onAumentar}>
                +
            </Boton>
        </div>
    );
}
