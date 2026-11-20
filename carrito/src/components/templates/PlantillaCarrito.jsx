// PLANTILLA: PlantillaCarrito
// El diseño completo de la página del carrito: el header arriba, la sección
// central (título, lista de ítems y resumen con el total) y, al final, el
// modal de confirmación. No sabe qué contiene cada parte; la página le
// entrega las piezas armadas.

import Titulo from "../atoms/Titulo.jsx";

export default function PlantillaCarrito({ encabezado, titulo, lista, resumen, modal }) {
    return (
        <>
            {encabezado}
            <main>
                <section className="cart-section">
                    <Titulo nivel={2}>{titulo}</Titulo>
                    {lista}
                    {resumen}
                </section>
            </main>
            {modal}
        </>
    );
}
