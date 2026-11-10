// MOLÉCULA: EncabezadoResena
// Primera línea de una reseña: el nombre de quien opina y sus estrellas.

import Texto from "../atoms/Texto.jsx";

export default function EncabezadoResena({ nombre, puntuacion }) {
    const estrellas = "★".repeat(puntuacion) + "☆".repeat(5 - puntuacion);

    return (
        <div className="review-header">
            <Texto como="strong">{nombre}</Texto>
            <Texto como="span" className="review-stars">
                {estrellas}
            </Texto>
        </div>
    );
}
