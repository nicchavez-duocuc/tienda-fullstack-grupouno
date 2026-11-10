// ORGANISMO: FormularioResena
// Formulario para dejar una reseña. Solo dibuja: los valores, las opciones y
// qué hacer al enviar los recibe de afuera (hook useResenas).

import AreaTexto from "../atoms/AreaTexto.jsx";
import Boton from "../atoms/Boton.jsx";
import Input from "../atoms/Input.jsx";
import Select from "../atoms/Select.jsx";
import Titulo from "../atoms/Titulo.jsx";
import CampoFormulario from "../molecules/CampoFormulario.jsx";

const ESTILO_BOTON_PUBLICAR = {
    backgroundColor: "#39FF14",
    color: "black",
    fontWeight: "bold",
    width: "100%",
    border: "none",
    padding: 12,
    cursor: "pointer",
    borderRadius: 5,
    fontSize: "1rem",
    marginTop: 10
};

export default function FormularioResena({ valores, opcionesProducto, opcionesPuntuacion, onCambio, onEnviar }) {
    return (
        <div className="review-form-container">
            <Titulo estilo={{ color: "#1E90FF", marginBottom: 15 }}>Deja tu opinión sobre un producto</Titulo>

            <form id="form-resena" onSubmit={onEnviar}>
                <CampoFormulario id="resena-producto" etiqueta="Producto:">
                    <Select
                        id="resena-producto"
                        opciones={opcionesProducto}
                        valor={valores.producto}
                        onCambio={(valor) => onCambio("producto", valor)}
                        requerido
                    />
                </CampoFormulario>

                <CampoFormulario id="resena-nombre" etiqueta="Tu Nombre / Apodo:">
                    <Input
                        id="resena-nombre"
                        placeholder="Ej: GamerPRO"
                        valor={valores.nombre}
                        onCambio={(valor) => onCambio("nombre", valor)}
                        requerido
                    />
                </CampoFormulario>

                <CampoFormulario id="resena-puntuacion" etiqueta="Calificación:">
                    <Select
                        id="resena-puntuacion"
                        opciones={opcionesPuntuacion}
                        valor={valores.puntuacion}
                        onCambio={(valor) => onCambio("puntuacion", valor)}
                        requerido
                    />
                </CampoFormulario>

                <CampoFormulario id="resena-comentario" etiqueta="Comentario:">
                    <AreaTexto
                        id="resena-comentario"
                        filas={3}
                        placeholder="¿Qué te pareció el producto que compraste?"
                        valor={valores.comentario}
                        onCambio={(valor) => onCambio("comentario", valor)}
                        requerido
                    />
                </CampoFormulario>

                <Boton tipo="submit" estilo={ESTILO_BOTON_PUBLICAR}>
                    Publicar Reseña
                </Boton>
            </form>
        </div>
    );
}
