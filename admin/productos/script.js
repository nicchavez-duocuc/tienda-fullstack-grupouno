    let catalogo = [];

    function cargarDatos() {
        // 1. Prioriza localStorage si ya hiciste cambios previos
        const local = localStorage.getItem('productosGamer');
        if (local) {
            try { return JSON.parse(local); } catch(e) {}
        }
        // 2. Si no, usa la variable global que define tu archivo productos.js
        if (typeof window.productos !== 'undefined') {
            return window.productos;
        }
        return [];
    }

    function sincronizar(nuevaLista) {
        catalogo = nuevaLista;
        window.productos = catalogo; // Actualiza el puente global
        localStorage.setItem('productosGamer', JSON.stringify(catalogo));
        renderizarTabla();
    }

    document.addEventListener('DOMContentLoaded', () => {
        catalogo = cargarDatos();
        sincronizar(catalogo);
    });

    function renderizarTabla() {
        const tbody = document.getElementById('tabla-body');
        const filtro = document.getElementById('buscador').value.toLowerCase();
        tbody.innerHTML = '';

        const filtrados = catalogo.filter(p => 
            p.nombre.toLowerCase().includes(filtro) || p.codigo.toLowerCase().includes(filtro)
        );

        filtrados.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b>${p.codigo}</b></td>
                <td><img src="${p.imagen}" onerror="this.src='https://via.placeholder.com/40'"></td>
                <td>${p.nombre}</td>
                <td>${p.categoria}</td>
                <td>$${Number(p.precio).toLocaleString('es-CL')}</td>
                <td>${p.stock}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-edit" onclick="editar('${p.codigo}')">Editar</button>
                        <button class="btn btn-danger" onclick="eliminar('${p.codigo}')">Eliminar</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    function abrirModal() {
        document.getElementById('modal-titulo').innerText = 'Nuevo Producto';
        document.getElementById('form').reset();
        document.getElementById('edit-codigo').value = '';
        document.getElementById('codigo').disabled = false;
        document.getElementById('modal').style.display = 'flex';
    }

    function editar(codigo) {
        const p = catalogo.find(item => item.codigo === codigo);
        if (!p) return;

        document.getElementById('modal-titulo').innerText = 'Editar Producto';
        document.getElementById('edit-codigo').value = p.codigo;
        document.getElementById('codigo').value = p.codigo;
        document.getElementById('codigo').disabled = true; // No cambiar código al editar
        document.getElementById('nombre').value = p.nombre;
        document.getElementById('categoria').value = p.categoria;
        document.getElementById('precio').value = p.precio;
        document.getElementById('stock').value = p.stock;
        document.getElementById('imagen').value = p.imagen;
        document.getElementById('descripcion').value = p.descripcion || '';

        document.getElementById('modal').style.display = 'flex';
    }

    function cerrarModal() {
        document.getElementById('modal').style.display = 'none';
    }

    function guardar(event) {
        event.preventDefault();
        const editCodigo = document.getElementById('edit-codigo').value;
        const codigo = document.getElementById('codigo').value.trim();

        const item = {
            codigo: codigo,
            nombre: document.getElementById('nombre').value.trim(),
            categoria: document.getElementById('categoria').value.trim(),
            precio: Number(document.getElementById('precio').value),
            stock: Number(document.getElementById('stock').value),
            imagen: document.getElementById('imagen').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim()
        };

        let lista = [...catalogo];
        if (editCodigo) {
            const index = lista.findIndex(p => p.codigo === editCodigo);
            if (index !== -1) lista[index] = item;
        } else {
            if (lista.some(p => p.codigo === codigo)) {
                alert('El código ya existe.');
                return;
            }
            lista.unshift(item);
        }

        sincronizar(lista);
        cerrarModal();
    }

    function eliminar(codigo) {
        if (!confirm(`¿Eliminar producto ${codigo}?`)) return;
        const lista = catalogo.filter(p => p.codigo !== codigo);
        sincronizar(lista);
    }