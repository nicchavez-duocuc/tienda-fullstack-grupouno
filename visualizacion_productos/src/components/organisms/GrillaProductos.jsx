// ORGANISMO: GrillaProductos
// La grilla con todas las tarjetas. Mientras el catálogo carga muestra un
// aviso; si no hay productos que mostrar, muestra el aviso de "sin resultados".

import MensajeSinResultados from "../molecules/MensajeSinResultados.jsx";
import Texto from "../atoms/Texto.jsx";
import TarjetaProducto from "./TarjetaProducto.jsx";

export default function GrillaProductos({ productos, busqueda, esDuoc, cargando, onVerDetalle, onAgregar }) {
    if (cargando) {
        return (
            <div className="no-results">
                <Texto>Cargando catálogo...</Texto>
            </div>
        );
    }

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
