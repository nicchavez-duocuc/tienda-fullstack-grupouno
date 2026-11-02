// MOLÉCULA: LogoSitio
// El nombre de la tienda ("LEVEL-UP GAMER") dentro de su contenedor del header.

import Titulo from "../atoms/Titulo.jsx";

export default function LogoSitio() {
    return (
        <div className="logo-container">
            <Titulo nivel={1}>LEVEL-UP GAMER</Titulo>
        </div>
    );
}
