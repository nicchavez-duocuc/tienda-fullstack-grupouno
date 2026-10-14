// ÁTOMO: MensajeError
// Texto rojo para errores de validación. Si no hay mensaje, no dibuja nada.

export default function MensajeError({ mensaje }) {
    if (!mensaje) return null;

    return (
        <p
            style={{
                color: "#ff5555",
                fontSize: "0.9rem",
                textAlign: "center",
                marginBottom: 15
            }}
        >
            {mensaje}
        </p>
    );
}
