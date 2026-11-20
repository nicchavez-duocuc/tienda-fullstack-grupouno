// ÁTOMO: Imagen
// Un <img>. Si le pasas onClick, avisa cuando la presionan.

export default function Imagen({ src, alt, id, onClick }) {
    return <img id={id} src={src} alt={alt} onClick={onClick} />;
}
