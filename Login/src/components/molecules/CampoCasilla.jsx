// MOLÉCULA: CampoCasilla
// Casilla + etiqueta en una fila (la de "Acepto los Terminos y Condiciones").
// Aquí la casilla va ANTES que la etiqueta, al revés que en CampoFormulario.

import Casilla from "../atoms/Casilla.jsx";
import Etiqueta from "../atoms/Etiqueta.jsx";

export default function CampoCasilla({ id, etiqueta, marcado, onCambio, requerido = true }) {
    return (
        <div className="input-group-checkbox">
            <Casilla id={id} marcado={marcado} onCambio={onCambio} requerido={requerido} />
            <Etiqueta para={id}>{etiqueta}</Etiqueta>
        </div>
    );
}
