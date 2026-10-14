// PLANTILLA: PlantillaCarrito
// Define el ORDEN de la página: lista de ítems, resumen con el total y, al
// final, el modal de confirmación. No sabe qué contiene cada parte; la página
// le entrega las piezas armadas.
// (El header sigue en carrito.html, fuera de React.)

export default function PlantillaCarrito({ lista, resumen, modal }) {
    return (
        <>
            {lista}
            {resumen}
            {modal}
        </>
    );
}
