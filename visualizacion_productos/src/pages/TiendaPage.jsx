// PÁGINA: TiendaPage
// Conecta la lógica (useCatalogo) con las piezas visuales y las entrega a la
// plantilla. Es lo que se monta en index.html.

import { useCatalogo } from "../hooks/useCatalogo.js";
import PlantillaCatalogo from "../components/templates/PlantillaCatalogo.jsx";
import BuscadorProductos from "../components/molecules/BuscadorProductos.jsx";
import FiltroCategorias from "../components/organisms/FiltroCategorias.jsx";
import GrillaProductos from "../components/organisms/GrillaProductos.jsx";

export default function TiendaPage() {
    const {
        categorias,
        categoriaActiva,
        busqueda,
        productosFiltrados,
        esDuoc,
        buscar,
        filtrarPorCategoria,
        agregarAlCarrito,
        verDetalle
    } = useCatalogo();

    return (
        <PlantillaCatalogo
            buscador={<BuscadorProductos valor={busqueda} onCambio={buscar} />}
            filtros={
                <FiltroCategorias
                    categorias={categorias}
                    categoriaActiva={categoriaActiva}
                    onSeleccionar={filtrarPorCategoria}
                />
            }
            grilla={
                <GrillaProductos
                    productos={productosFiltrados}
                    busqueda={busqueda}
                    esDuoc={esDuoc}
                    onVerDetalle={verDetalle}
                    onAgregar={agregarAlCarrito}
                />
            }
        />
    );
}
