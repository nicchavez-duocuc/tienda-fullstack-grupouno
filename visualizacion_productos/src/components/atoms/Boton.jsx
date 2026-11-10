// ÁTOMO: Boton
// Un <button> genérico. No sabe qué hace: muestra su contenido y avisa
// cuando lo presionan. El aspecto lo da la clase CSS (o el estilo) que le pases.

export default function Boton({ children, tipo = "button", className, estilo, onClick, onMouseEnter, onMouseLeave }) {
    return (
        <button
            type={tipo}
            className={className}
            style={estilo}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </button>
    );
}
