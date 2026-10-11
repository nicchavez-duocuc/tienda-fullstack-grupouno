// ORGANISMO: GrillaProductos
// La grilla con todas las tarjetas. Si no hay productos que mostrar, muestra
// el aviso de "sin resultados".

import MensajeSinResultados from "../molecules/MensajeSinResultados.jsx";
import TarjetaProducto from "./TarjetaProducto.jsx";

export default function GrillaProductos({ productos, busqueda, esDuoc, onVerDetalle, onAgregar }) {
    return (
        <div className="grid-container">
            {productos.length === 0 ? (
                <MensajeSinResultados busqueda={busqueda} />
            ) : (
                productos.map((producto) => (
                    <TarjetaProducto
                        key={producto.codigo}
                        producto={producto}
                        esDuoc={esDuoc}
                        onVerDetalle={onVerDetalle}
                        onAgregar={onAgregar}
                    />
                ))
            )}
        </div>
    );
}
