// PÁGINA: ResenasPage
// La sección "Reseñas y Calificaciones". Se monta en #react-resenas-root.

import { useResenas } from "../hooks/useResenas.jsx";
import PlantillaResenas from "../components/templates/PlantillaResenas.jsx";
import FormularioResena from "../components/organisms/FormularioResena.jsx";
import ListaResenas from "../components/organisms/ListaResenas.jsx";

export default function ResenasPage() {
    const { resenas, valores, opcionesProducto, opcionesPuntuacion, error, cambiarCampo, enviar } = useResenas();

    return (
        <PlantillaResenas
            titulo="💬 Reseñas y Calificaciones"
            avisoError={error}
            formulario={
                <FormularioResena
                    valores={valores}
                    opcionesProducto={opcionesProducto}
                    opcionesPuntuacion={opcionesPuntuacion}
                    onCambio={cambiarCampo}
                    onEnviar={enviar}
                />
            }
            lista={<ListaResenas resenas={resenas} />}
        />
    );
}
