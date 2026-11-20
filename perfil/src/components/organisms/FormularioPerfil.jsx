// ORGANISMO: FormularioPerfil
// Formulario completo de editar perfil: foto, apodo y cambio de clave. Solo
// dibuja: los valores, el error y qué hacer al enviar los recibe de afuera
// (hook usePerfil).

import Boton from "../atoms/Boton.jsx";
import MensajeError from "../atoms/MensajeError.jsx";
import Titulo from "../atoms/Titulo.jsx";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import SelectorAvatar from "../molecules/SelectorAvatar.jsx";

export default function FormularioPerfil({ valores, vistaPreviaAvatar, error, onCambio, onCambiarAvatar, onEnviar }) {
    return (
        <form id="profile-form" onSubmit={onEnviar}>
            <SelectorAvatar vistaPrevia={vistaPreviaAvatar} onSeleccionar={onCambiarAvatar} />

            <CampoFormulario
                id="apodo"
                name="apodo"
                etiqueta="Apodo"
                placeholder="tu apodo Gamer"
                valor={valores.apodo}
                onCambio={(valor) => onCambio("apodo", valor)}
                requerido
            />

            <CampoFormulario
                id="clave-anterior"
                name="clave-anterior"
                etiqueta="Clave actual"
                tipo="password"
                placeholder="*******"
                encabezado={<Titulo nivel={2}>¿Quieres cambiar tu clave?</Titulo>}
                valor={valores.claveAnterior}
                onCambio={(valor) => onCambio("claveAnterior", valor)}
            />

            <CampoFormulario
                id="clave-nueva"
                name="clave-nueva"
                etiqueta="Nueva Clave"
                tipo="password"
                placeholder="******"
                valor={valores.claveNueva}
                onCambio={(valor) => onCambio("claveNueva", valor)}
            />

            <MensajeError mensaje={error} />

            <Boton tipo="submit" id="btn-guardar">
                Guardar Cambios
            </Boton>
        </form>
    );
}
