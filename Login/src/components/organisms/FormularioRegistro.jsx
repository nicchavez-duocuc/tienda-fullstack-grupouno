// ORGANISMO: FormularioRegistro
// Formulario completo de creación de cuenta. Solo dibuja: los valores, el
// error y qué hacer al enviar los recibe de afuera (hook useRegistro).

import Boton from "../atoms/Boton.jsx";
import MensajeError from "../atoms/MensajeError.jsx";
import CampoCasilla from "../molecules/CampoCasilla.jsx";
import CampoFormulario from "../molecules/CampoFormulario.jsx";

export default function FormularioRegistro({ valores, error, onCambio, onEnviar }) {
    return (
        <form id="register-form" onSubmit={onEnviar}>
            <CampoFormulario
                id="nombre"
                name="nombre"
                etiqueta="Nombre"
                placeholder=" juan Pablo"
                valor={valores.nombre}
                onCambio={(valor) => onCambio("nombre", valor)}
            />
            <CampoFormulario
                id="apellido"
                name="apellido"
                etiqueta="Apellido"
                placeholder="Perez"
                valor={valores.apellido}
                onCambio={(valor) => onCambio("apellido", valor)}
            />
            <CampoFormulario
                id="fecha"
                name="fecha"
                etiqueta="Fecha de Nacimiento"
                tipo="date"
                valor={valores.fecha}
                onCambio={(valor) => onCambio("fecha", valor)}
            />
            <CampoFormulario
                id="Gmail"
                name="Gmail"
                etiqueta="Gmail"
                tipo="email"
                placeholder="juan_pablo@gmail.com"
                valor={valores.correo}
                onCambio={(valor) => onCambio("correo", valor)}
            />
            <CampoFormulario
                id="clave"
                name="clave"
                etiqueta="Crear Clave"
                tipo="password"
                placeholder="********"
                claseGrupo="register-form"
                valor={valores.clave}
                onCambio={(valor) => onCambio("clave", valor)}
            />
            <CampoCasilla
                id="terms"
                etiqueta="Acepto los Terminos y Condiciones"
                marcado={valores.terminos}
                onCambio={(valor) => onCambio("terminos", valor)}
            />

            <MensajeError mensaje={error} />

            <Boton tipo="submit" id="btn-registrar">
                Crear Cuenta
            </Boton>
        </form>
    );
}
