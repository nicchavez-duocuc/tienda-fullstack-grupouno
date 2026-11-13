// hooks/usePerfil.jsx
// Estado y lógica de la página de perfil: datos del usuario, foto, cambio de
// clave y guardado. Ahora guarda contra el backend (PUT /api/v1/usuarios/me),
// usando el token JWT que dejó el login. Si no hay sesión, manda al login.

import { useState, useEffect, useRef } from "react";
import { obtenerUsuarioActivo, guardarPerfil } from "../services/usuarios.jsx";
import { AVATAR_POR_DEFECTO, leerArchivoComoBase64 } from "../services/avatar.jsx";
import { actualizarMiPerfil, haySesion, ErrorSesion } from "../services/api.jsx";

export function usePerfil() {
    // El usuario se lee UNA vez, al abrir la página
    const [usuario] = useState(obtenerUsuarioActivo);

    const [valores, setValores] = useState(() => ({
        apodo: usuario ? usuario.apodo || usuario.nombre || "" : "",
        claveAnterior: "",
        claveNueva: ""
    }));

    // vistaPrevia = lo que se ve en pantalla; base64 = lo que se guardaría
    const [avatar, setAvatar] = useState(() => ({
        vistaPrevia: (usuario && usuario.avatar) || AVATAR_POR_DEFECTO,
        base64: (usuario && usuario.avatar) || ""
    }));

    const [error, setError] = useState("");

    // Sin sesión: avisar y mandar al login. La marca evita que el aviso salga
    // dos veces (en desarrollo React ejecuta los efectos dos veces).
    const avisoMostrado = useRef(false);
    useEffect(() => {
        if ((!usuario || !haySesion()) && !avisoMostrado.current) {
            avisoMostrado.current = true;
            alert("No hay una sesión activa. Redirigiendo al Login.");
            window.location.href = "../Login/Inicio_Sesion.html";
        }
    }, [usuario]);

    function cambiarCampo(campo, valor) {
        setValores((anteriores) => ({ ...anteriores, [campo]: valor }));
    }

    // Al elegir una foto: se ve al instante y, cuando termina de leerse, queda lista para guardar
    function cambiarAvatar(archivo) {
        setAvatar((anterior) => ({ ...anterior, vistaPrevia: URL.createObjectURL(archivo) }));
        leerArchivoComoBase64(archivo).then((base64) => setAvatar((anterior) => ({ ...anterior, base64 })));
    }

    async function enviar(event) {
        event.preventDefault();
        setError("");

        const actual = obtenerUsuarioActivo();
        if (!actual || !haySesion()) {
            window.location.href = "../Login/Inicio_Sesion.html";
            return;
        }

        const apodo = valores.apodo.trim();
        const claveAnterior = valores.claveAnterior.trim();
        const claveNueva = valores.claveNueva.trim();

        if (claveAnterior && !claveNueva) {
            setError("Por favor ingresa la nueva contraseña.");
            return;
        }

        const cambios = { apodo };
        if (avatar.base64) cambios.avatar = avatar.base64;
        if (claveAnterior || claveNueva) {
            cambios.claveAnterior = claveAnterior;
            cambios.claveNueva = claveNueva;
        }

        try {
            const actualizado = await actualizarMiPerfil(cambios);

            // Se refleja el cambio de inmediato en el header y en el resto de la tienda
            guardarPerfil({ ...actual, ...actualizado });

            setValores((anteriores) => ({ ...anteriores, claveAnterior: "", claveNueva: "" }));
            alert("¡Perfil actualizado con éxito!");
        } catch (e) {
            if (e instanceof ErrorSesion) {
                alert(e.message);
                window.location.href = "../Login/Inicio_Sesion.html";
                return;
            }
            setError(e?.message || "No se pudo actualizar el perfil.");
        }
    }

    return { valores, vistaPreviaAvatar: avatar.vistaPrevia, error, cambiarCampo, cambiarAvatar, enviar };
}
