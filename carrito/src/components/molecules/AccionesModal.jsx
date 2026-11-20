// MOLÉCULA: AccionesModal
// Botones de abajo del modal. Si es una alerta (esAlerta) solo muestra el
// botón de aceptar; si es una pregunta, muestra también "Cancelar".

import Boton from "../atoms/Boton.jsx";

export default function AccionesModal({ esAlerta, textoBoton, colorFondo, colorTexto, onCancelar, onConfirmar }) {
    return (
        <div className="modal-actions">
            {!esAlerta && (
                <Boton className="btn-cancelar" onClick={onCancelar}>
                    Cancelar
                </Boton>
            )}
            <Boton className="btn-accion" estilo={{ backgroundColor: colorFondo, color: colorTexto }} onClick={onConfirmar}>
                {textoBoton}
            </Boton>
        </div>
    );
}
