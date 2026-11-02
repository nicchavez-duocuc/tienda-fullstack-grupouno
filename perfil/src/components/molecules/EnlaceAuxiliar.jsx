// MOLÉCULA: EnlaceAuxiliar
// El enlace de abajo de la tarjeta ("← Volver a la Tienda"), centrado dentro
// de su contenedor. "claseContenedor" e "id" eligen el estilo definido en el
// CSS de la página.

import Enlace from "../atoms/Enlace.jsx";

export default function EnlaceAuxiliar({ claseContenedor, id, href, children }) {
    return (
        <div className={claseContenedor}>
            <Enlace href={href} id={id}>
                {children}
            </Enlace>
        </div>
    );
}
