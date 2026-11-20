// ÁTOMO: Enlace
// Un <a> que lleva a otra página.

export default function Enlace({ children, href, className, id, titulo, estilo }) {
    return (
        <a href={href} className={className} id={id} title={titulo} style={estilo}>
            {children}
        </a>
    );
}
