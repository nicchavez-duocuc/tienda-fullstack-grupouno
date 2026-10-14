// ÁTOMO: Texto
// Un párrafo <p>. El estilo se puede ajustar con "estilo".

export default function Texto({ children, estilo }) {
    return <p style={estilo}>{children}</p>;
}
