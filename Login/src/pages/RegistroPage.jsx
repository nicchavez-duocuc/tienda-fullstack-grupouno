// PÁGINA: RegistroPage
// La página completa de creación de cuenta. Conecta la lógica (useRegistro)
// con las piezas visuales. Se monta en #react-register-root de registrar.html.

import { useRegistro } from "../hooks/useRegistro.jsx";
import PlantillaAuth from "../components/templates/PlantillaAuth.jsx";
import Texto from "../components/atoms/Texto.jsx";
import Titulo from "../components/atoms/Titulo.jsx";
import EncabezadoAuth from "../components/molecules/EncabezadoAuth.jsx";
import EnlaceAuxiliar from "../components/molecules/EnlaceAuxiliar.jsx";
import FormularioRegistro from "../components/organisms/FormularioRegistro.jsx";

export default function RegistroPage() {
    const { valores, error, cambiarCampo, enviar } = useRegistro();

    return (
        <PlantillaAuth
            encabezado={
                <EncabezadoAuth>
                    <Titulo nivel={1}>Bienvenido a la Comunidad Gamer</Titulo>
                </EncabezadoAuth>
            }
            claseTarjeta="register-container"
            subtitulo={
                <Texto como="span" className="subtitle">
                    Registro Completo
                </Texto>
            }
            titulo="Crear Cuenta"
            formulario={
                <FormularioRegistro valores={valores} error={error} onCambio={cambiarCampo} onEnviar={enviar} />
            }
            enlace={
                <EnlaceAuxiliar claseContenedor="login-link" id="link-login" href="Inicio_Sesion.html">
                    &larr; Volver al Inicio Sesion
                </EnlaceAuxiliar>
            }
        />
    );
}
