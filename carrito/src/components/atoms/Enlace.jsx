// ÁTOMO: Enlace
// Un <a> que lleva a otra página. El aspecto lo da la clase CSS que le pases.

export default function Enlace({ children, href, className }) {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    );
}
