// ÁTOMO: Texto
// Un párrafo <p>. Con como="span" se dibuja en la misma línea en vez de bloque.

export default function Texto({ children, como: Tag = "p", className, estilo }) {
    return (
        <Tag className={className} style={estilo}>
            {children}
        </Tag>
    );
}
