// ÁTOMO: Imagen
// Un <img>. Si le pasas onClick, avisa cuando la presionan.

export default function Imagen({ src, alt, estilo, titulo, onClick }) {
    return <img src={src} alt={alt} style={estilo} title={titulo} onClick={onClick} />;
}
