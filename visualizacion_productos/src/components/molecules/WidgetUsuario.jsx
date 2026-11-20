// MOLÉCULA: WidgetUsuario
// El bloque del header con la foto y el apodo del usuario: el enlace lleva a
// su perfil y al lado tiene el botón "Cerrar sesión" (limpia el JWT y los
// datos de la sesión y vuelve al login). Su estilo (.user-profile-widget,
// #header-avatar, #header-apodo) está en estilo.css.

import Enlace from "../atoms/Enlace.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Texto from "../atoms/Texto.jsx";
import { cerrarSesion } from "../../services/usuarios.jsx";

export default function WidgetUsuario({ apodo, avatar }) {
    function cerrarSesionDelUsuario() {
        cerrarSesion();
        window.location.href = "../Login/Inicio_Sesion.html";
    }

    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
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
            <button
                type="button"
                onClick={cerrarSesionDelUsuario}
                titulo="Cerrar sesión y volver al login"
                style={{
                    padding: "4px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    border: "1px solid #999",
                    background: "transparent",
                    color: "inherit"
                }}
            >
                Cerrar sesión
            </button>
        </span>
    );
}
