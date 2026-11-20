// ÁTOMO: Boton
// Un <button> genérico. No sabe qué hace: muestra su contenido y avisa
// cuando lo presionan. El aspecto lo da la clase CSS (o el estilo) que le pases.

export default function Boton({ children, className, estilo, onClick }) {
    return (
        <button type="button" className={className} style={estilo} onClick={onClick}>
            {children}
        </button>
    );
}
