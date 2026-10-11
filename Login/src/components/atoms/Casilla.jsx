// ÁTOMO: Casilla
// Un <input type="checkbox"> controlado. Cuando la marcan o desmarcan, llama
// a onCambio con true o false.

export default function Casilla({ id, marcado, onCambio, requerido = false }) {
    return (
        <input
            type="checkbox"
            id={id}
            checked={marcado}
            required={requerido}
            onChange={(e) => onCambio(e.target.checked)}
        />
    );
}
