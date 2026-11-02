    // Importación con la ruta exacta solicitada
    import { CATEGORIAS as categoriasOriginales } from '../../visualizacion_productos/src/categorias.js';

    let listaCategorias = [];

    function cargarDatos() {
        const local = localStorage.getItem('categoriasGamer');
        if (local) {
            try { return JSON.parse(local); } catch(e) {}
        }
        return categoriasOriginales;
    }

    function sincronizar(nuevaLista) {
        listaCategorias = nuevaLista;
        window.CATEGORIAS = listaCategorias;
        localStorage.setItem('categoriasGamer', JSON.stringify(listaCategorias));
        renderizarTabla();
    }

    document.addEventListener('DOMContentLoaded', () => {
        listaCategorias = cargarDatos();
        sincronizar(listaCategorias);
    });

    window.renderizarTabla = function() {
        const tbody = document.getElementById('tabla-body');
        const filtro = document.getElementById('buscador').value.toLowerCase();
        tbody.innerHTML = '';

        const filtradas = listaCategorias.filter((cat) => 
            cat.toLowerCase().includes(filtro)
        );

        filtradas.forEach((cat) => {
            const realIndex = listaCategorias.indexOf(cat);
            const esTodos = cat.toLowerCase() === "todos";

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b>${realIndex + 1}</b></td>
                <td>${cat}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-edit" onclick="window.editar(${realIndex})">Editar</button>
                        ${!esTodos ? `<button class="btn btn-danger" onclick="window.eliminar(${realIndex})">Eliminar</button>` : '<span style="font-size:12px; color:#888; padding:5px;">(Protegida)</span>'}
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.abrirModal = function() {
        document.getElementById('modal-titulo').innerText = 'Nueva Categoría';
        document.getElementById('form').reset();
        document.getElementById('edit-index').value = '';
        document.getElementById('modal').style.display = 'flex';
    }

    window.editar = function(index) {
        const cat = listaCategorias[index];
        if (!cat) return;

        document.getElementById('modal-titulo').innerText = 'Editar Categoría';
        document.getElementById('edit-index').value = index;
        document.getElementById('nombre-categoria').value = cat;

        document.getElementById('modal').style.display = 'flex';
    }

    window.cerrarModal = function() {
        document.getElementById('modal').style.display = 'none';
    }

    window.guardar = function(event) {
        event.preventDefault();
        const editIndex = document.getElementById('edit-index').value;
        const nombre = document.getElementById('nombre-categoria').value.trim();

        if (!nombre) return;

        if (listaCategorias.map(c => c.toLowerCase()).includes(nombre.toLowerCase()) && editIndex === "") {
            alert('Esta categoría ya existe.');
            return;
        }

        let nuevaLista = [...listaCategorias];
        if (editIndex !== "") {
            nuevaLista[Number(editIndex)] = nombre;
        } else {
            nuevaLista.push(nombre);
        }

        sincronizar(nuevaLista);
        window.cerrarModal();
    }

    window.eliminar = function(index) {
        const cat = listaCategorias[index];
        if (!confirm(`¿Estás seguro de eliminar la categoría "${cat}"?`)) return;

        const nuevaLista = listaCategorias.filter((_, i) => i !== index);
        sincronizar(nuevaLista);
    }

    window.descargarJsActualizado = function() {
        const contenido = `// categorias.js actualizadas\nexport const CATEGORIAS = ${JSON.stringify(listaCategorias, null, 4)};\n\nif (typeof window !== "undefined") {\n    window.CATEGORIAS = CATEGORIAS;\n}`;
        const blob = new Blob([contenido], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'categorias.js';
        a.click();
        URL.revokeObjectURL(url);
    }