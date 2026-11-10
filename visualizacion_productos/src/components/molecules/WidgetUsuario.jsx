// MOLÉCULA: WidgetUsuario
// El enlace del header que muestra la foto y el apodo del usuario y lleva a
// su perfil. Su estilo (.user-profile-widget, #header-avatar, #header-apodo)
// está en estilo.css.

import Enlace from "../atoms/Enlace.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Texto from "../atoms/Texto.jsx";

export default function WidgetUsuario({ apodo, avatar }) {
    return (
        <Enlace
            href="../perfil/perfil.html"
            className="user-profile-widget"
            id="profile-link"
            titulo="Ir a mi perfil"
            estilo={{ margin: 0 }}
        >
            <Imagen id="header-avatar" src={avatar} alt="Perfil" />
            <Texto como="span" id="header-apodo">
                {apodo}
            </Texto>
        </Enlace>
    );
}
