// MOLÉCULA: SelectorAvatar
// La foto de perfil y el texto "CAMBIAR FOTO". Al hacer clic en cualquiera de
// los dos se abre el selector de archivos (que está escondido). Cuando eligen
// una foto, avisa con onSeleccionar.

import { useRef } from "react";
import Imagen from "../atoms/Imagen.jsx";
import InputArchivo from "../atoms/InputArchivo.jsx";
import Texto from "../atoms/Texto.jsx";

export default function SelectorAvatar({ vistaPrevia, onSeleccionar }) {
    const refInput = useRef(null);

    function abrirSelector() {
        refInput.current.click();
    }

    return (
        <div className="profile-avatar-container">
            <Imagen id="avatar-preview" src={vistaPrevia} alt="Foto de Perfil" onClick={abrirSelector} />
            <Texto como="span" className="btn-avatar" onClick={abrirSelector}>
                CAMBIAR FOTO
            </Texto>
            <InputArchivo id="avatar-input" accept="image/*" onCambio={onSeleccionar} refInput={refInput} />
        </div>
    );
}
