// ORGANISMO: FormularioLogin
// Formulario completo de inicio de sesión. Solo dibuja: los valores, el error
// y qué hacer al enviar los recibe de afuera (hook useLogin).

import Boton from "../atoms/Boton.jsx";
import MensajeError from "../atoms/MensajeError.jsx";
import CampoFormulario from "../molecules/CampoFormulario.jsx";

export default function FormularioLogin({ valores, error, onCambio, onEnviar }) {
    return (
        <form id="login-form" onSubmit={onEnviar}>
            <CampoFormulario
                id="email"
                name="email"
                etiqueta="Gmail"
                tipo="email"
                placeholder="tucorreo@gmail.com"
                valor={valores.email}
                onCambio={(valor) => onCambio("email", valor)}
            />
            <CampoFormulario
                id="clave"
                name="clave"
                etiqueta="Clave"
                tipo="password"
                placeholder="*********"
                valor={valores.clave}
                onCambio={(valor) => onCambio("clave", valor)}
            />

            <MensajeError mensaje={error} />

            <Boton tipo="submit" id="btn-submit">
                Iniciar Sesion
            </Boton>
        </form>
    );
}
