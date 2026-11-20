// ÁTOMO: Texto
// Un texto corto. Con como="span" se dibuja en línea; por defecto es un
// párrafo. Si le pasas onClick, avisa cuando lo presionan.

export default function Texto({ children, como: Tag = "p", className, onClick }) {
    return (
        <Tag className={className} onClick={onClick}>
            {children}
        </Tag>
    );
}
