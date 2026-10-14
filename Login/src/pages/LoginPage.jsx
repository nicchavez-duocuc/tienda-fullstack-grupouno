// PÁGINA: LoginPage
// Conecta la lógica (useLogin) con el formulario y lo entrega a la plantilla.
// Es lo que se monta en Inicio_Sesion.html.

import { useLogin } from "../hooks/useLogin.js";
import PlantillaFormulario from "../components/templates/PlantillaFormulario.jsx";
import FormularioLogin from "../components/organisms/FormularioLogin.jsx";

export default function LoginPage() {
    const { valores, error, cambiarCampo, enviar } = useLogin();

    return (
        <PlantillaFormulario
            formulario={
                <FormularioLogin valores={valores} error={error} onCambio={cambiarCampo} onEnviar={enviar} />
            }
        />
    );
}
