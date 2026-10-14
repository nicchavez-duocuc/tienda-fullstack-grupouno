// ÁTOMO: Titulo
// Un encabezado <h1>..<h6>. El nivel se elige con "nivel" (por defecto 4).

export default function Titulo({ children, nivel = 4, estilo }) {
    const Tag = `h${nivel}`;
    return <Tag style={estilo}>{children}</Tag>;
}
