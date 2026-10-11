// PÁGINA: RegistroPage
// Conecta la lógica (useRegistro) con el formulario y lo entrega a la plantilla.
// Es lo que se monta en registrar.html.

import { useRegistro } from "../hooks/useRegistro.js";
import PlantillaFormulario from "../components/templates/PlantillaFormulario.jsx";
import FormularioRegistro from "../components/organisms/FormularioRegistro.jsx";

export default function RegistroPage() {
    const { valores, error, cambiarCampo, enviar } = useRegistro();

    return (
        <PlantillaFormulario
            formulario={
                <FormularioRegistro valores={valores} error={error} onCambio={cambiarCampo} onEnviar={enviar} />
            }
        />
    );
}
