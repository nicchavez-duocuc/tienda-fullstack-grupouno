// ÁTOMO: Titulo
// Un encabezado <h1>..<h6>. El nivel se elige con "nivel" (por defecto 2).

export default function Titulo({ children, nivel = 2 }) {
    const Tag = `h${nivel}`;
    return <Tag>{children}</Tag>;
}
