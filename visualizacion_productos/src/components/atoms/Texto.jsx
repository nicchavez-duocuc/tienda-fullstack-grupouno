// ÁTOMO: Texto
// Un párrafo <p>. Con como="span", "strong" o "small" cambia la etiqueta.

export default function Texto({ children, como: Tag = "p", id, className, estilo }) {
    return (
        <Tag id={id} className={className} style={estilo}>
            {children}
        </Tag>
    );
}
