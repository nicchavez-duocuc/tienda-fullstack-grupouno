// MOLÉCULA: PrecioDetalle
// El precio grande del modal de detalle. Si el usuario es Duoc muestra el
// precio normal tachado y al lado el precio con 20% de descuento.

import Precio from "../atoms/Precio.jsx";
import Texto from "../atoms/Texto.jsx";

export default function PrecioDetalle({ precio, precioDescuento, esDuoc }) {
    return (
        <Texto className="modal-price" estilo={{ marginTop: 0 }}>
            {esDuoc ? (
                <>
                    <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "0.9rem" }}>
                        <Precio valor={precio} />
                    </span>{" "}
                    <span style={{ color: "#39FF14", fontWeight: "bold", fontSize: "1.2rem", marginLeft: 8 }}>
                        <Precio valor={precioDescuento} /> (20% OFF)
                    </span>
                </>
            ) : (
                <Precio valor={precio} />
            )}
        </Texto>
    );
}
