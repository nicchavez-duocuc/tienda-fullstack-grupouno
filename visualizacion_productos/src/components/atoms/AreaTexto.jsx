// ÁTOMO: AreaTexto
// Un <textarea> controlado (para comentarios largos). Llama a onCambio con
// el texto ya listo.

export default function AreaTexto({ id, filas = 3, placeholder, valor, onCambio, requerido = false }) {
    return (
        <textarea
            id={id}
            rows={filas}
            placeholder={placeholder}
            value={valor}
            required={requerido}
            onChange={(e) => onCambio(e.target.value)}
        />
    );
}
