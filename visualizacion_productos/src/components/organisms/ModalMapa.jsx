// ORGANISMO: ModalMapa
// Modal con la imagen del mapa ("Promo Exclusiva"). Si "abierto" es false
// no dibuja nada. La imagen mapa_Level-UP.jpg debe estar junto a index.html.

import Boton from "../atoms/Boton.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Titulo from "../atoms/Titulo.jsx";
import VentanaModal from "../molecules/VentanaModal.jsx";

export default function ModalMapa({ abierto, onCerrar }) {
    if (!abierto) return null;

    return (
        <VentanaModal estilo={{ textAlign: "center", position: "relative", padding: "30px 20px 20px", maxWidth: 600 }}>
            <Boton
                className="close-modal"
                estilo={{ position: "absolute", top: 10, right: 15, fontSize: 28 }}
                onClick={onCerrar}
            >
                ✕
            </Boton>
            <Titulo nivel={3} estilo={{ color: "#39FF14", marginBottom: 15 }}>
                Promo Exclusiva
            </Titulo>
            <Imagen
                src="mapa_Level-UP.jpg"
                alt="Imagen Especial"
                estilo={{ width: "100%", borderRadius: 8, border: "1px solid #333" }}
            />
        </VentanaModal>
    );
}
