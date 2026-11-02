// ORGANISMO: TarjetaResena
// Una reseña publicada: quién opina, estrellas, producto, comentario y fecha.

import Texto from "../atoms/Texto.jsx";
import EncabezadoResena from "../molecules/EncabezadoResena.jsx";

export default function TarjetaResena({ resena }) {
    return (
        <div className="review-card">
            <EncabezadoResena nombre={resena.nombre} puntuacion={resena.puntuacion} />
            <Texto className="review-product">
                📦 <em>{resena.producto}</em>
            </Texto>
            <Texto className="review-comment">{`"${resena.comentario}"`}</Texto>
            <Texto como="small" className="review-date">
                {resena.fecha}
            </Texto>
        </div>
    );
}
