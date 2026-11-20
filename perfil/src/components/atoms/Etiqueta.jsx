// ÁTOMO: Etiqueta
// Un <label> asociado a un campo por su id (prop "para").

export default function Etiqueta({ children, para }) {
    return <label htmlFor={para}>{children}</label>;
}
