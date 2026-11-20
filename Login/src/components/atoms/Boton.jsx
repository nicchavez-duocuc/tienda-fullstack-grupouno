// ÁTOMO: Boton
// Un <button>. Con tipo="submit" envía el formulario donde está. El aspecto
// lo da el id (o la clase) que le pases, definido en los CSS de la página.

export default function Boton({ children, tipo = "button", id, onClick }) {
    return (
        <button type={tipo} id={id} onClick={onClick}>
            {children}
        </button>
    );
}
