// services/resenas.jsx
// Reseñas guardadas en localStorage. Reemplaza la parte de datos de
// renderizarResenas() y guardarResena() de Script.js.

const CLAVE_RESENAS = "resenasGamer";

// Reseña de ejemplo: se muestra mientras nadie haya publicado ninguna
const RESENA_EJEMPLO = {
    producto: "PC Gamer ASUS ROG Strix",
    nombre: "Carlos M.",
    puntuacion: 5,
    comentario: "Excelente rendimiento en juegos, corren todos los títulos en ultra sin problemas.",
    fecha: "05/09/2026"
};

// Opciones del selector de calificación
export const OPCIONES_PUNTUACION = [
    { valor: "5", texto: "⭐⭐⭐⭐⭐ (5/5 - Excelente)" },
    { valor: "4", texto: "⭐⭐⭐⭐☆ (4/5 - Muy bueno)" },
    { valor: "3", texto: "⭐⭐⭐☆☆ (3/5 - Regular)" },
    { valor: "2", texto: "⭐⭐☆☆☆ (2/5 - Mala)" },
    { valor: "1", texto: "⭐☆☆☆☆ (1/5 - Muy mala)" }
];

function leerGuardadas() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_RESENAS));
    } catch {
        return null;
    }
}

// Reseñas que se muestran: las guardadas o, si no hay ninguna, la de ejemplo
export function leerResenas() {
    return leerGuardadas() || [RESENA_EJEMPLO];
}

// Agrega una reseña al principio, la guarda y devuelve la lista actualizada
export function guardarResena(nuevaResena) {
    const resenas = leerGuardadas() || [];
    resenas.unshift(nuevaResena);
    localStorage.setItem(CLAVE_RESENAS, JSON.stringify(resenas));
    return resenas;
}
