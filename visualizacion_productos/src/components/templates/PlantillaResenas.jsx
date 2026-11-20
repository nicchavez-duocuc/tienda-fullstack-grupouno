// PLANTILLA: PlantillaResenas
// La sección completa de reseñas: la caja (.reviews-section), su título,
// el formulario y la lista de opiniones.

import Titulo from "../atoms/Titulo.jsx";

export default function PlantillaResenas({ titulo, formulario, lista, avisoError }) {
    return (
        <section className="reviews-section">
            <Titulo nivel={3} estilo={{ textAlign: "center", color: "#39FF14", marginBottom: 25 }}>
                {titulo}
            </Titulo>
            {avisoError && (
                <p style={{ color: "#ffcc00", textAlign: "center", fontWeight: "bold" }}>{avisoError}</p>
            )}
            {formulario}
            {lista}
        </section>
    );
}
