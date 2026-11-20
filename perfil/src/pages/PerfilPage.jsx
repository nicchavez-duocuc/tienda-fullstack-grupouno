// PÁGINA: PerfilPage
// La página completa de editar perfil. Conecta la lógica (usePerfil) con las
// piezas visuales. Se monta en #react-perfil-root de perfil.html.

import { usePerfil } from "../hooks/usePerfil.jsx";
import PlantillaPerfil from "../components/templates/PlantillaPerfil.jsx";
import Texto from "../components/atoms/Texto.jsx";
import Titulo from "../components/atoms/Titulo.jsx";
import EncabezadoPagina from "../components/molecules/EncabezadoPagina.jsx";
import EnlaceAuxiliar from "../components/molecules/EnlaceAuxiliar.jsx";
import FormularioPerfil from "../components/organisms/FormularioPerfil.jsx";

export default function PerfilPage() {
    const { valores, vistaPreviaAvatar, error, cambiarCampo, cambiarAvatar, enviar } = usePerfil();

    return (
        <PlantillaPerfil
            encabezado={
                <EncabezadoPagina>
                    <Titulo nivel={1}>Bienvenido Comunidad Gamer</Titulo>
                </EncabezadoPagina>
            }
            subtitulo={
                // OJO: la clase "sutitle" tiene una letra de menos (el CSS define
                // ".subtitle"). Se dejó así para no cambiar cómo se ve hoy tu página.
                <Texto como="span" className="sutitle">
                    Ajustes de Usuario
                </Texto>
            }
            titulo="Editar Perfil"
            formulario={
                <FormularioPerfil
                    valores={valores}
                    vistaPreviaAvatar={vistaPreviaAvatar}
                    error={error}
                    onCambio={cambiarCampo}
                    onCambiarAvatar={cambiarAvatar}
                    onEnviar={enviar}
                />
            }
            enlace={
                <EnlaceAuxiliar claseContenedor="navigation-link" id="link-volver" href="../visualizacion_productos/index.html">
                    &larr; Volver a la Tienda
                </EnlaceAuxiliar>
            }
        />
    );
}
