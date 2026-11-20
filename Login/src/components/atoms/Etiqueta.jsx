// ÁTOMO: Etiqueta
// Un <label> asociado a un campo por su id (prop "para"). Al hacer clic en
// la etiqueta se enfoca (o marca) el campo.

export default function Etiqueta({ children, para }) {
    return <label htmlFor={para}>{children}</label>;
}
