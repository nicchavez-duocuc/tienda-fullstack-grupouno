// ORGANISMO: ItemCarrito
// Una fila del carrito: imagen, nombre, precios, control de cantidad y botón
// para eliminar. "item" ya trae los precios calculados (precioBase,
// precioFinal y subtotal), así este componente solo dibuja.

import Boton from "../atoms/Boton.jsx";
import Imagen from "../atoms/Imagen.jsx";
import Precio from "../atoms/Precio.jsx";
import Texto from "../atoms/Texto.jsx";
import Titulo from "../atoms/Titulo.jsx";
import ControlCantidad from "../molecules/ControlCantidad.jsx";
import PrecioUnitario from "../molecules/PrecioUnitario.jsx";

export default function ItemCarrito({ item, esDuoc, onAumentar, onDisminuir, onEliminar }) {
    return (
        <div className="cart-item">
            <Imagen src={item.imagen} alt={item.nombre} />

            <div className="item-details">
                <Titulo estilo={{ color: "#39FF14" }}>{item.nombre}</Titulo>
                <PrecioUnitario precioBase={item.precioBase} precioFinal={item.precioFinal} esDuoc={esDuoc} />
                <Texto estilo={{ marginTop: 5 }}>
                    Subtotal: <strong><Precio valor={item.subtotal} /></strong>
                </Texto>
            </div>

            <ControlCantidad
                cantidad={item.cantidad}
                onAumentar={() => onAumentar(item.codigo)}
                onDisminuir={() => onDisminuir(item.codigo)}
            />

            <Boton className="btn-remove" onClick={() => onEliminar(item.codigo)}>
                Eliminar
            </Boton>
        </div>
    );
}
