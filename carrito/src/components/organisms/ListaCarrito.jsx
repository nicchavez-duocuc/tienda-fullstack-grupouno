// ORGANISMO: ListaCarrito
// Todos los ítems del carrito, o un mensaje si está vacío.

import Texto from "../atoms/Texto.jsx";
import ItemCarrito from "./ItemCarrito.jsx";

export default function ListaCarrito({ items, esDuoc, onAumentar, onDisminuir, onEliminar }) {
    return (
        <div id="cart-container">
            {items.length === 0 ? (
                <Texto estilo={{ textAlign: "center", padding: 20 }}>
                    Tu carrito está vacío. ¡Ve a la tienda a buscar algo genial!
                </Texto>
            ) : (
                items.map((item) => (
                    <ItemCarrito
                        key={item.codigo}
                        item={item}
                        esDuoc={esDuoc}
                        onAumentar={onAumentar}
                        onDisminuir={onDisminuir}
                        onEliminar={onEliminar}
                    />
                ))
            )}
        </div>
    );
}
