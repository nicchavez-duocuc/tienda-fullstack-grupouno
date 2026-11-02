// ORGANISMO: ModalDetalleProducto
// Modal con el detalle de un producto (imagen grande, descripción y precio).
// "producto" es null (cerrado) o el producto que se está viendo.

import Boton from "../atoms/Boton.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Texto from "../atoms/Texto.jsx";
import Titulo from "../atoms/Titulo.jsx";
import EncabezadoModal from "../molecules/EncabezadoModal.jsx";
import PieModal from "../molecules/PieModal.jsx";
import PrecioDetalle from "../molecules/PrecioDetalle.jsx";
import VentanaModal from "../molecules/VentanaModal.jsx";

export default function ModalDetalleProducto({ producto, esDuoc, onCerrar, onAgregar }) {
    if (!producto) return null;

    return (
        <VentanaModal>
            <EncabezadoModal titulo="ℹ️ Detalle del Producto" colorTitulo="#1E90FF" onCerrar={onCerrar} />

            <div className="modal-body" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <Imagen
                    src={producto.imagen}
                    alt={producto.nombre}
                    estilo={{
                        width: "100%",
                        height: 200,
                        objectFit: "contain",
                        marginBottom: 15,
                        background: "#fff",
                        borderRadius: 5,
                        padding: 10
                    }}
                />
                <Titulo estilo={{ color: "#1E90FF", fontSize: "1.3rem", marginBottom: 5 }}>{producto.nombre}</Titulo>
                <Texto estilo={{ color: "#aaa", fontSize: "0.9rem", marginBottom: 12 }}>
                    Categoría: {producto.categoria}
                </Texto>
                <Texto estilo={{ lineHeight: 1.5, color: "#ddd", marginBottom: 15 }}>
                    {producto.descripcion || "Sin descripción disponible por el momento."}
                </Texto>
                <PrecioDetalle
                    precio={producto.precio}
                    precioDescuento={producto.precioDescuento}
                    esDuoc={esDuoc}
                />
            </div>

            <PieModal>
                <Boton className="btn-seguir" onClick={onCerrar}>
                    Cerrar
                </Boton>
                <Boton
                    className="btn-ir-carro"
                    estilo={{ border: "none", cursor: "pointer" }}
                    onClick={() => onAgregar(producto.codigo)}
                >
                    Añadir al Carrito
                </Boton>
            </PieModal>
        </VentanaModal>
    );
}
