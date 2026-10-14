// ORGANISMO: FiltroCategorias
// Fila de botones de categoría. "categoriaActiva" es la que se ve resaltada
// (null cuando hay texto en el buscador, para que ninguna aparezca activa).

import Boton from "../atoms/Boton.jsx";

export default function FiltroCategorias({ categorias, categoriaActiva, onSeleccionar }) {
    return (
        <div className="category-filters">
            {categorias.map((categoria) => (
                <Boton
                    key={categoria}
                    className={"filter-btn" + (categoria === categoriaActiva ? " active" : "")}
                    onClick={() => onSeleccionar(categoria)}
                >
                    {categoria}
                </Boton>
            ))}
        </div>
    );
}
