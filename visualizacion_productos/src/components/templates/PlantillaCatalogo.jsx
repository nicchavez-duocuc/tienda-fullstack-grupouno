// PLANTILLA: PlantillaCatalogo
// Define el ORDEN de la sección de productos: buscador, filtros y grilla.
// No sabe qué contiene cada parte; la página le entrega las piezas armadas.
// (El header, el hero y el footer siguen en index.html, fuera de React.)

export default function PlantillaCatalogo({ buscador, filtros, grilla }) {
    return (
        <>
            {buscador}
            {filtros}
            {grilla}
        </>
    );
}
