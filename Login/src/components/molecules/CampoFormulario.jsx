// MOLÉCULA: CampoFormulario
// Etiqueta + campo de texto dentro de un <div>. Reemplaza los bloques repetidos
// de "label + input" de los formularios de login y registro.
//
// claseGrupo elige el estilo del contenedor: "input-group" (el normal) o
// "register-form" (el campo de clave del registro).

import Etiqueta from "../atoms/Etiqueta.jsx";
import Input from "../atoms/Input.jsx";

export default function CampoFormulario({
    id,
    etiqueta,
    tipo = "text",
    name,
    valor,
    onCambio,
    placeholder,
    requerido = true,
    claseGrupo = "input-group"
}) {
    return (
        <div className={claseGrupo}>
            <Etiqueta para={id}>{etiqueta}</Etiqueta>
            <Input
                tipo={tipo}
                id={id}
                name={name}
                valor={valor}
                onCambio={onCambio}
                placeholder={placeholder}
                requerido={requerido}
            />
        </div>
    );
}
