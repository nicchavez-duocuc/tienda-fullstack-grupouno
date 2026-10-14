// MOLÉCULA: MensajeSinResultados
// Aviso que aparece cuando la búsqueda no encuentra ningún producto.

import Texto from "../atoms/Texto.jsx";

export default function MensajeSinResultados({ busqueda }) {
    return (
        <div className="no-results">
            <Texto>
                ⚠️ No se encontraron productos que coincidan con "<strong>{busqueda}</strong>".
            </Texto>
        </div>
    );
}
