// PLANTILLA: PlantillaPerfil
// El diseño completo de la página de perfil: el header arriba y, en el
// centro, la tarjeta (.profile-container) con su subtítulo, título,
// formulario y enlace de abajo. No sabe qué contiene cada parte; la página le
// entrega las piezas armadas.

import Titulo from "../atoms/Titulo.jsx";

export default function PlantillaPerfil({ encabezado, subtitulo, titulo, formulario, enlace }) {
    return (
        <>
            {encabezado}
            <main>
                <section className="profile-container">
                    {subtitulo}
                    <Titulo nivel={2}>{titulo}</Titulo>
                    {formulario}
                    {enlace}
                </section>
            </main>
        </>
    );
}
