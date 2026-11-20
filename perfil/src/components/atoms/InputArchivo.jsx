// ÁTOMO: InputArchivo
// Un <input type="file"> escondido. Cuando eligen un archivo, llama a
// onCambio con ese archivo. "refInput" permite que otro componente lo abra
// con un clic (el input se ve feo, por eso se esconde).

export default function InputArchivo({ id, accept, onCambio, refInput }) {
    return (
        <input
            type="file"
            id={id}
            accept={accept}
            ref={refInput}
            style={{ display: "none" }}
            onChange={(e) => {
                const archivo = e.target.files[0];
                if (archivo) onCambio(archivo);
            }}
        />
    );
}
