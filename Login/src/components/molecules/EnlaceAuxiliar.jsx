// MOLÉCULA: EnlaceAuxiliar
// El enlace de abajo de la tarjeta ("Crear Cuenta →" en el login,
// "← Volver al Inicio Sesion" en el registro), centrado dentro de su contenedor.
// "claseContenedor" e "id" eligen el estilo definido en el CSS de cada página.

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
