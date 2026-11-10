// hooks/usePerfil.jsx
// Estado y lógica de la página de perfil: datos del usuario, foto, cambio de
// clave y guardado. Reemplaza el bloque "1. LÓGICA DEL PERFIL" de usuarios.js.
//
// Cambios respecto al original:
//  - Los 2 alert() de validación de la clave ahora son un mensaje bajo el
//    formulario. El alert() de "Perfil actualizado" se dejó igual.
//  - Si no hay sesión, el aviso lleva al login de verdad
//    (../login/Inicio_Sesion.html). Antes iba a "Inicio_Sesion.html", que no
//    existe dentro de la carpeta perfil.

import { useState, useEffect, useRef } from "react";
import { obtenerUsuarioActivo, guardarPerfil } from "../services/usuarios.jsx";
import { AVATAR_POR_DEFECTO, leerArchivoComoBase64 } from "../services/avatar.jsx";

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
        if (!usuario && !avisoMostrado.current) {
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

        // Se lee de nuevo, por si la sesión cambió en otra pestaña
        const actual = obtenerUsuarioActivo();
        if (!actual) return;

        const apodo = valores.apodo.trim();
        const claveAnterior = valores.claveAnterior.trim();
        const claveNueva = valores.claveNueva.trim();

        // Si escribió algo en el cambio de clave, las dos son obligatorias
        if (claveAnterior || claveNueva) {
            if (!claveAnterior) {
                setError("Error: La contraseña actual es incorrecta.");
                return;
            }
            if (!claveNueva) {
                setError("Por favor ingresa la nueva contraseña.");
                return;
            }
        }

        const actualizado = { ...actual, apodo, claveAnterior, claveNueva };
        if (avatar.base64) actualizado.avatar = avatar.base64;

        try {
            // El backend valida la clave anterior, guarda con BCrypt y devuelve
            // los datos del usuario ya actualizados
            await guardarPerfil(actualizado);
        } catch (error) {
            setError(error.mensaje || "No se pudo actualizar el perfil.");
            return;
        }

        setValores((anteriores) => ({ ...anteriores, claveAnterior: "", claveNueva: "" }));
        alert("¡Perfil actualizado con éxito!");
    }

    return { valores, vistaPreviaAvatar: avatar.vistaPrevia, error, cambiarCampo, cambiarAvatar, enviar };
}
