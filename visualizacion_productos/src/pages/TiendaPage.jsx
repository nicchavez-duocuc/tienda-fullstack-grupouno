// PÁGINA: TiendaPage
// La sección de productos: buscador, filtros, grilla y los modales de
// detalle y de "producto agregado". Se monta en #react-productos-root.

import { useCatalogo } from "../hooks/useCatalogo.jsx";
import { useModalesProducto } from "../hooks/useModalesProducto.jsx";
import PlantillaCatalogo from "../components/templates/PlantillaCatalogo.jsx";
import BuscadorProductos from "../components/molecules/BuscadorProductos.jsx";
import FiltroCategorias from "../components/organisms/FiltroCategorias.jsx";
import GrillaProductos from "../components/organisms/GrillaProductos.jsx";
import ModalDetalleProducto from "../components/organisms/ModalDetalleProducto.jsx";
import ModalProductoAgregado from "../components/organisms/ModalProductoAgregado.jsx";

export default function TiendaPage() {
    const { categorias, categoriaActiva, busqueda, productosFiltrados, esDuoc, buscar, filtrarPorCategoria } =
        useCatalogo();
    const { detalle, agregado, verDetalle, cerrarDetalle, agregarAlCarrito, agregarDesdeDetalle, cerrarAgregado } =
        useModalesProducto();

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
            modales={
                <>
                    <ModalDetalleProducto
                        producto={detalle}
                        esDuoc={esDuoc}
                        onCerrar={cerrarDetalle}
                        onAgregar={agregarDesdeDetalle}
                    />
                    <ModalProductoAgregado agregado={agregado} onCerrar={cerrarAgregado} />
                </>
            }
        />
    );
}
