// ÁTOMO: Enlace
// Un <a> que lleva a otra página. El aspecto lo da el id (o la clase) que le
// pases, definido en el CSS de la página.

export default function Enlace({ children, href, id }) {
    return (
        <a href={href} id={id}>
            {children}
        </a>
    );
}
