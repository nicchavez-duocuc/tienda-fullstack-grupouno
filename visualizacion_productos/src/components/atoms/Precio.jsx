// ÁTOMO: Precio
// Escribe un número como precio chileno: 1500000 -> $1.500.000
// Devuelve solo texto (sin etiqueta), así toma el estilo del párrafo que lo contiene.

export default function Precio({ valor }) {
    return (
        <>
            {"$"}
            {valor.toLocaleString("es-CL")}
        </>
    );
}
