// MOLÉCULA: CampoFormulario
// Etiqueta + campo (texto o contraseña) dentro de su contenedor (.input-group).
// "encabezado" es opcional: un título que va antes de la etiqueta (por ejemplo
// "¿Quieres cambiar tu clave?").

import Etiqueta from "../atoms/Etiqueta.jsx";
import Input from "../atoms/Input.jsx";

export default function CampoFormulario({
    id,
    name,
    etiqueta,
    tipo = "text",
    placeholder,
    valor,
    onCambio,
    requerido = false,
    encabezado
}) {
    return (
        <div className="input-group">
            {encabezado}
            <Etiqueta para={id}>{etiqueta}</Etiqueta>
            <Input
                tipo={tipo}
                id={id}
                name={name}
                placeholder={placeholder}
                valor={valor}
                onCambio={onCambio}
                requerido={requerido}
            />
        </div>
    );
}
