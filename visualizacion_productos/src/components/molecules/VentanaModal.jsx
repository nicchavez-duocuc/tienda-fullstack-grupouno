// MOLÉCULA: VentanaModal
// El marco de cualquier modal: el fondo oscuro que cubre la pantalla
// (.modal-overlay) y la caja blanca del centro (.modal-content).
// "estilo" ajusta la caja (por ejemplo el modal del mapa es más ancho).

export default function VentanaModal({ children, estilo }) {
    return (
        <div className="modal-overlay" style={{ display: "flex" }}>
            <div className="modal-content" style={estilo}>
                {children}
            </div>
        </div>
    );
}
