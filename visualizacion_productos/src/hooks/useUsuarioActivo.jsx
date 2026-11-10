// hooks/useUsuarioActivo.jsx
// Los datos que muestra el header: el apodo y la foto del usuario. Reemplaza
// el bloque "ACTUALIZAR HEADER DE LA TIENDA" de usuarios.js.
//
// Sin sesión se muestra "Gamer" con la foto por defecto. Con sesión: el apodo
// (o, si no tiene, el nombre) y la foto guardada; si no tiene foto, una
// generada con su apodo.

import { useState } from "react";
import { obtenerUsuarioActivo } from "../services/usuarios.jsx";

const AVATAR_POR_DEFECTO = "https://ui-avatars.com/api/?name=Gamer&background=1E90FF&color=fff";

function leerDatosDelHeader() {
    const usuario = obtenerUsuarioActivo();
    if (!usuario) return { apodo: "Gamer", avatar: AVATAR_POR_DEFECTO };

    const apodo = usuario.apodo || usuario.nombre || "Gamer";
    const avatar =
        usuario.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(apodo)}&background=1E90FF&color=fff`;

    return { apodo, avatar };
}

export function useUsuarioActivo() {
    // Se lee UNA vez, al abrir la página (igual que antes)
    const [datos] = useState(leerDatosDelHeader);
    return datos;
}
