// PÁGINA: LoginPage
// La página completa de inicio de sesión. Conecta la lógica (useLogin) con las
// piezas visuales. Se monta en #react-login-root de Inicio_Sesion.html.

import { useLogin } from "../hooks/useLogin.jsx";
import PlantillaAuth from "../components/templates/PlantillaAuth.jsx";
import EncabezadoAuth from "../components/molecules/EncabezadoAuth.jsx";
import EnlaceAuxiliar from "../components/molecules/EnlaceAuxiliar.jsx";
import FormularioLogin from "../components/organisms/FormularioLogin.jsx";

export default function LoginPage() {
    const { valores, error, cambiarCampo, enviar } = useLogin();

    return (
        <PlantillaAuth
            encabezado={<EncabezadoAuth>Bienvenido a la comunidad Gamer</EncabezadoAuth>}
            claseTarjeta="login-container"
            titulo="Inicio Sesion"
            formulario={
                <FormularioLogin valores={valores} error={error} onCambio={cambiarCampo} onEnviar={enviar} />
            }
            enlace={
                <EnlaceAuxiliar claseContenedor="register-link" id="link-crear-cuenta" href="registrar.html">
                    Crear Cuenta &rarr;
                </EnlaceAuxiliar>
            }
        />
    );
}
