// PLANTILLA: PlantillaAuth
// El diseño completo de una página de acceso (login o registro): el header
// arriba y, en el centro, la tarjeta con su subtítulo (opcional), título,
// formulario y enlace de abajo. No sabe qué contiene cada parte; la página le
// entrega las piezas armadas.
//
// "claseTarjeta" elige el estilo de la tarjeta: "login-container" o
// "register-container".

import Titulo from "../atoms/Titulo.jsx";

export default function PlantillaAuth({ encabezado, claseTarjeta, subtitulo, titulo, formulario, enlace }) {
    return (
        <>
            {encabezado}
            <main>
                <section className={claseTarjeta}>
                    {subtitulo}
                    <Titulo nivel={2}>{titulo}</Titulo>
                    {formulario}
                    {enlace}
                </section>
            </main>
        </>
    );
}
