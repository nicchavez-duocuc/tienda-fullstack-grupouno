// MOLÉCULA: CampoFormulario
// Una etiqueta y, debajo, el campo que le pases como contenido (un Input, un
// Select o un AreaTexto). "id" es el id de ese campo.

import Etiqueta from "../atoms/Etiqueta.jsx";

export default function CampoFormulario({ id, etiqueta, children }) {
    return (
        <div className="form-group">
            <Etiqueta para={id}>{etiqueta}</Etiqueta>
            {children}
        </div>
    );
}
