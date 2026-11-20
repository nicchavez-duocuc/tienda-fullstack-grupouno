// MOLÉCULA: BotonMapa
// El botón "🗺️ Ver Mapa" del header: contorno verde que se rellena al pasar
// el mouse por encima.

import { useState } from "react";
import Boton from "../atoms/Boton.jsx";

export default function BotonMapa({ onClick }) {
    const [encima, setEncima] = useState(false);

    const estilo = {
        margin: 0,
        backgroundColor: encima ? "#39FF14" : "transparent",
        border: "2px solid #39FF14",
        color: encima ? "#000" : "#39FF14",
        padding: "8px 15px",
        borderRadius: 20,
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.3s ease"
    };

    return (
        <Boton
            estilo={estilo}
            onClick={onClick}
            onMouseEnter={() => setEncima(true)}
            onMouseLeave={() => setEncima(false)}
        >
            🗺️ Ver Mapa
        </Boton>
    );
}
