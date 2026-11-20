// ÁTOMO: Imagen
// Un <img>. Si le pasas onClick, avisa cuando la presionan.

export default function Imagen({ src, alt, id, className, estilo, titulo, onClick }) {
    return <img id={id} src={src} alt={alt} className={className} style={estilo} title={titulo} onClick={onClick} />;
}
