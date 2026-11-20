// MOLÉCULA: BuscadorProductos
// Lupa + campo de texto para buscar productos por nombre.

import Icono from "../atoms/Icono.jsx";
import Input from "../atoms/Input.jsx";

export default function BuscadorProductos({ valor, onCambio }) {
    return (
        <div className="search-container">
            <Icono className="search-icon" simbolo="🔍" />
            <Input
                className="search-input"
                placeholder="Buscar producto por nombre..."
                valor={valor}
                onCambio={onCambio}
            />
        </div>
    );
}
