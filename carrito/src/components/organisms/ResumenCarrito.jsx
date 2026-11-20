// ORGANISMO: ResumenCarrito
// Caja inferior del carrito: total a pagar y botones de vaciar / pagar.

import Boton from "../atoms/Boton.jsx";
import TotalCarrito from "../molecules/TotalCarrito.jsx";

export default function ResumenCarrito({ total, onVaciar, onPagar }) {
    return (
        <div className="cart-summary">
            <TotalCarrito total={total} />
            <Boton className="btn-vaciar" onClick={onVaciar}>
                Vaciar Carrito
            </Boton>
            <Boton className="btn-pagar" onClick={onPagar}>
                Proceder al Pago
            </Boton>
        </div>
    );
}
