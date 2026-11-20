// ÁTOMO: Input
// Un <input> controlado (texto, email, contraseña, fecha...). Cuando el
// usuario escribe, llama a onCambio con el texto ya listo (no con el evento).

export default function Input({ tipo = "text", id, name, valor, onCambio, placeholder, requerido = false }) {
    return (
        <input
            type={tipo}
            id={id}
            name={name}
            placeholder={placeholder}
            value={valor}
            required={requerido}
            onChange={(e) => onCambio(e.target.value)}
        />
    );
}
