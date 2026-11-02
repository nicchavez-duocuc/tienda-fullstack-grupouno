// MOLÉCULA: TotalCarrito
// Título "Total a pagar:" + el monto.

import Precio from "../atoms/Precio.jsx";
import Titulo from "../atoms/Titulo.jsx";

export default function TotalCarrito({ total }) {
    return (
        <Titulo nivel={3}>
            Total a pagar: <Precio valor={total} />
        </Titulo>
    );
}
