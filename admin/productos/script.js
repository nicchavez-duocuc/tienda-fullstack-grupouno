// admin/productos/script.js
// CRUD de productos contra el backend de Spring Boot:
//   GET    /api/v1/productos        (lista con categoria)
//   POST   /api/v1/productos        -> cuerpo {codigo, nombre, precio, stock, imagen, descripcion, categoria:{nombre}}
//   PUT    /api/v1/productos/{codigo}
//   DELETE /api/v1/productos/{codigo}
// Solo ADMIN tiene permiso: si el backend devuelve 401/403 se avisa y se
// lleva a iniciar sesión. Ya no se guarda nada en localStorage.

    const BASE = "http://localhost:8080/api/v1";

    function encabezados() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (localStorage.getItem("jwtActivo") || "")
        };
    }

    // Si la sesión expiró o alguien entró sin ser ADMIN, lo manda a login
    function manejarError(err, cayoSesion) {
        if (cayoSesion) {
            alert("Necesitas iniciar sesión como ADMIN para usar este panel.");
            window.location.href = "../Login/Inicio_Sesion.html";
        } else {
            alert("Error: " + (err.mensaje || "no se pudo contactar al servidor"));
        }
    }

    let catalogo = [];

    // GET: carga el catálogo de la base de datos
    async function cargarDatos() {
        try {
            const respuesta = await fetch(BASE + "/productos", { headers: encabezados() });
            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarError({}, true);
                return [];
            }
            catalogo = await respuesta.json();
            renderizarTabla();
            return catalogo;
        } catch (e) {
            manejarError({ mensaje: e.message }, false);
            return [];
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        cargarDatos();
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
                <td>${p.categoria ? p.categoria.nombre : ''}</td>
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

    window.renderizarTabla = renderizarTabla;

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
        document.getElementById('categoria').value = p.categoria ? p.categoria.nombre : '';
        document.getElementById('precio').value = p.precio;
        document.getElementById('stock').value = p.stock;
        document.getElementById('imagen').value = p.imagen;
        document.getElementById('descripcion').value = p.descripcion || '';

        document.getElementById('modal').style.display = 'flex';
    }

    function cerrarModal() {
        document.getElementById('modal').style.display = 'none';
    }

    // POST (nuevo) o PUT (editar). La categoria viaja solo su nombre
    async function guardar(event) {
        event.preventDefault();
        const editCodigo = document.getElementById('edit-codigo').value;
        const codigo = document.getElementById('codigo').value.trim();

        const item = {
            codigo: codigo,
            nombre: document.getElementById('nombre').value.trim(),
            categoria: { nombre: document.getElementById('categoria').value.trim() },
            precio: Number(document.getElementById('precio').value),
            stock: Number(document.getElementById('stock').value),
            imagen: document.getElementById('imagen').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim()
        };

        try {
            const respuesta = await fetch(BASE + "/productos" + (editCodigo ? "/" + editCodigo : ""), {
                method: editCodigo ? 'PUT' : 'POST',
                headers: encabezados(),
                body: JSON.stringify(item)
            });

            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarError({}, true);
                return;
            }
            if (!respuesta.ok) {
                const error = await respuesta.json();
                alert('Error: ' + (error.mensaje || error.error || 'no se pudo guardar'));
                return;
            }

            await cargarDatos(); // vuelve a leer la tabla desde la base de datos
            cerrarModal();
        } catch (e) {
            manejarError({ mensaje: e.message }, false);
        }
    }

    async function eliminar(codigo) {
        if (!confirm(`¿Eliminar producto ${codigo}?`)) return;
        try {
            const respuesta = await fetch(BASE + "/productos/" + codigo, { method: 'DELETE', headers: encabezados() });
            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarError({}, true);
                return;
            }
            if (!respuesta.ok) {
                const error = await respuesta.json();
                alert('Error: ' + (error.mensaje || error.error || 'no se pudo eliminar'));
                return;
            }
            await cargarDatos();
        } catch (e) {
            manejarError({ mensaje: e.message }, false);
        }
    }

    // Funciones globales para los onclick del HTML
    window.abrirModal = abrirModal;
    window.editar = editar;
    window.guardar = guardar;
    window.eliminar = eliminar;
    window.cerrarModal = cerrarModal;
