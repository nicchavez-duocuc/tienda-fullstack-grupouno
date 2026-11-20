// ORGANISMO: EncabezadoCarrito
// El header de la página del carrito: el logo a la izquierda y el enlace
// para volver a la tienda a la derecha.

import Enlace from "../atoms/Enlace.jsx";
import LogoSitio from "../molecules/LogoSitio.jsx";

export default function EncabezadoCarrito() {
    return (
        <header>
            <LogoSitio />
            <Enlace href="../visualizacion_productos/index.html" className="btn-volver">
                ⬅ Volver a la Tienda
            </Enlace>
        </header>
    );
}
