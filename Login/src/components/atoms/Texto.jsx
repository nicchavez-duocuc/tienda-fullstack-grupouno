// ÁTOMO: Texto
// Un texto corto. Con como="span" se dibuja en línea; por defecto es un párrafo.

export default function Texto({ children, como: Tag = "p", className }) {
    return <Tag className={className}>{children}</Tag>;
}
