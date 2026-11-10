// ORGANISMO: ListaResenas
// "Opiniones de la Comunidad": todas las reseñas publicadas, o un aviso si
// todavía no hay ninguna.

import Texto from "../atoms/Texto.jsx";
import Titulo from "../atoms/Titulo.jsx";
import TarjetaResena from "./TarjetaResena.jsx";

export default function ListaResenas({ resenas }) {
    return (
        <div className="reviews-list-container" style={{ marginTop: 30 }}>
            <Titulo estilo={{ color: "#1E90FF", marginBottom: 15 }}>Opiniones de la Comunidad</Titulo>
            <div id="lista-resenas" className="reviews-grid">
                {resenas.length === 0 ? (
                    <Texto estilo={{ color: "#aaa" }}>Aún no hay reseñas. ¡Sé el primero en opinar!</Texto>
                ) : (
                    resenas.map((resena, indice) => <TarjetaResena key={indice} resena={resena} />)
                )}
            </div>
        </div>
    );
}
