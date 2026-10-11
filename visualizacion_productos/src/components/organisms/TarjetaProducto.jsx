// ORGANISMO: TarjetaProducto
// La tarjeta de un producto: imagen, nombre, categoría, precio y botón
// para añadir al carrito.

import Boton from "../atoms/Boton.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Texto from "../atoms/Texto.jsx";
import Titulo from "../atoms/Titulo.jsx";
import PrecioProducto from "../molecules/PrecioProducto.jsx";

const ESTILO_BOTON_AGREGAR = {
    backgroundColor: "#39FF14",
    color: "black",
    border: "none",
    padding: 10,
    cursor: "pointer",
    marginTop: 10,
    width: "100%",
    borderRadius: 5,
    fontWeight: "bold"
};

export default function TarjetaProducto({ producto, esDuoc, onVerDetalle, onAgregar }) {
    return (
        <div className="product-card">
            <Imagen
                src={producto.imagen}
                alt={producto.nombre}
                estilo={{ cursor: "pointer" }}
                titulo="Haz clic para ver la descripción"
                onClick={() => onVerDetalle(producto.codigo)}
            />
            <Titulo>{producto.nombre}</Titulo>
            <Texto>Categoría: {producto.categoria}</Texto>
            <PrecioProducto precio={producto.precio} esDuoc={esDuoc} />
            <Boton estilo={ESTILO_BOTON_AGREGAR} onClick={() => onAgregar(producto.codigo)}>
                Añadir al Carrito
            </Boton>
        </div>
    );
}
