// ÁTOMO: Icono
// Un emoji grande que ocupa su propia línea (<div>), como el del modal.

export default function Icono({ simbolo, className }) {
    return <div className={className}>{simbolo}</div>;
}
