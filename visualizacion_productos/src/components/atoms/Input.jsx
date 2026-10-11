// ÁTOMO: Input
// Un <input> de texto controlado. Cuando el usuario escribe, llama a
// onCambio con el texto ya listo (no con el evento).

export default function Input({ className, placeholder, valor, onCambio }) {
    return (
        <input
            type="text"
            className={className}
            placeholder={placeholder}
            value={valor}
            onChange={(e) => onCambio(e.target.value)}
        />
    );
}
