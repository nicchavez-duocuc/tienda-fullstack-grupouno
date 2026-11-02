// ÁTOMO: Input
// Un <input> controlado. Cuando el usuario escribe, llama a onCambio con el
// texto ya listo (no con el evento).

export default function Input({ tipo = "text", id, className, placeholder, valor, onCambio, requerido = false }) {
    return (
        <input
            type={tipo}
            id={id}
            className={className}
            placeholder={placeholder}
            value={valor}
            required={requerido}
            onChange={(e) => onCambio(e.target.value)}
        />
    );
}
