// MOLÉCULA: PrecioUnitario
// Línea "Precio Unitario: ..." de un ítem. Si el usuario es Duoc muestra el
// precio base tachado y el precio final (con 20% de descuento) en verde.

import Precio from "../atoms/Precio.jsx";
import Texto from "../atoms/Texto.jsx";

export default function PrecioUnitario({ precioBase, precioFinal, esDuoc }) {
    if (!esDuoc) {
        return (
            <Texto>
                Precio Unitario: <Precio valor={precioFinal} />
            </Texto>
        );
    }

    return (
        <Texto>
            Precio Unitario:{" "}
            <span style={{ textDecoration: "line-through", color: "#aaa" }}>
                <Precio valor={precioBase} />
            </span>{" "}
            <strong style={{ color: "#39FF14" }}>
                <Precio valor={precioFinal} /> (20% OFF)
            </strong>
        </Texto>
    );
}
