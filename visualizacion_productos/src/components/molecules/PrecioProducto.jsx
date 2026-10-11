// MOLÉCULA: PrecioProducto
// El precio de una tarjeta. Si el usuario es Duoc muestra el precio normal
// tachado y debajo el precio con 20% de descuento.

import Precio from "../atoms/Precio.jsx";
import Texto from "../atoms/Texto.jsx";

const FACTOR_DUOC = 0.8; // 20% de descuento

export default function PrecioProducto({ precio, esDuoc }) {
    if (!esDuoc) {
        return (
            <Texto estilo={{ fontWeight: "bold", color: "#1E90FF", fontSize: "1.1rem", marginTop: 5 }}>
                <Precio valor={precio} />
            </Texto>
        );
    }

    return (
        <>
            <Texto
                estilo={{
                    textDecoration: "line-through",
                    color: "#aaa",
                    fontSize: "0.9rem",
                    marginTop: 5,
                    marginBottom: 0
                }}
            >
                <Precio valor={precio} />
            </Texto>
            <Texto estilo={{ fontWeight: "bold", color: "#39FF14", fontSize: "1.1rem", marginTop: 2 }}>
                <Precio valor={Math.round(precio * FACTOR_DUOC)} />{" "}
                <span style={{ fontSize: "0.8rem", color: "#39FF14" }}>(20% OFF)</span>
            </Texto>
        </>
    );
}
