// ÁTOMO: Select
// Una lista desplegable controlada. "opciones" es una lista de
// { valor, texto }. Llama a onCambio con el valor elegido.

export default function Select({ id, valor, onCambio, opciones, requerido = false }) {
    return (
        <select id={id} value={valor} required={requerido} onChange={(e) => onCambio(e.target.value)}>
            {opciones.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                    {opcion.texto}
                </option>
            ))}
        </select>
    );
}
