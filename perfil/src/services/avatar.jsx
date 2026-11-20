// services/avatar.jsx
// Foto de perfil: la imagen por defecto y la conversión de un archivo a texto
// (base64) para poder guardarlo en localStorage.

export const AVATAR_POR_DEFECTO = "https://ui-avatars.com/api/?name=Gamer&background=1E90FF&color=fff";

// Lee el archivo elegido y devuelve (con una promesa) la imagen como texto base64
export function leerArchivoComoBase64(archivo) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.onload = (evento) => resolve(evento.target.result);
        lector.onerror = () => reject(lector.error);
        lector.readAsDataURL(archivo);
    });
}
