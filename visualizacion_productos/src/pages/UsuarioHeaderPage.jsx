// PÁGINA: UsuarioHeaderPage
// La foto y el apodo del usuario en el header. Se monta en #react-usuario-root.

import { useUsuarioActivo } from "../hooks/useUsuarioActivo.jsx";
import WidgetUsuario from "../components/molecules/WidgetUsuario.jsx";

export default function UsuarioHeaderPage() {
    const { apodo, avatar } = useUsuarioActivo();

    return <WidgetUsuario apodo={apodo} avatar={avatar} />;
}
