// PÁGINA: MapaPage
// El botón "Ver Mapa" del header y su modal. Se monta en #react-mapa-root.

import { useModal } from "../hooks/useModal.jsx";
import PlantillaMapa from "../components/templates/PlantillaMapa.jsx";
import BotonMapa from "../components/molecules/BotonMapa.jsx";
import ModalMapa from "../components/organisms/ModalMapa.jsx";

export default function MapaPage() {
    const { abierto, abrir, cerrar } = useModal();

    return <PlantillaMapa boton={<BotonMapa onClick={abrir} />} modal={<ModalMapa abierto={abierto} onCerrar={cerrar} />} />;
}
