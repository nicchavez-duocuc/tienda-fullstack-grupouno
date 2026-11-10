// admin/categorias/script.js
// CRUD de categorias contra el backend de Spring Boot:
//   GET    /api/v1/categorias       -> [{id, nombre, descripcion}]
//   POST   /api/v1/categorias
//   PUT    /api/v1/categorias/{id}
//   DELETE /api/v1/categorias/{id}
// Solo ADMIN tiene permiso. La categoria "Todos" era solo del buscador de la
// tienda, por eso ya no vive en esta lista (la agrega el frontend solito).

    const BASE = "http://localhost:8080/api/v1";

    function encabezados() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (localStorage.getItem("jwtActivo") || "")
        };
    }

    function manejarError(err, cayoSesion) {
        if (cayoSesion) {
            alert("Necesitas iniciar sesión como ADMIN para usar este panel.");
            window.location.href = "../Login/Inicio_Sesion.html";
        } else {
            alert("Error: " + (err.mensaje || "no se pudo contactar al servidor"));
        }
    }

    let listaCategorias = [];

    async function cargarDatos() {
        try {
            const respuesta = await fetch(BASE + "/categorias", { headers: encabezados() });
            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarError({}, true);
                return;
            }
            listaCategorias = await respuesta.json(); // [{id, nombre, descripcion}]
            renderizarTabla();
        } catch (e) {
            manejarError({ mensaje: e.message }, false);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        cargarDatos();
    });

    window.renderizarTabla = function() {
        const tbody = document.getElementById('tabla-body');
        const filtro = document.getElementById('buscador').value.toLowerCase();
        tbody.innerHTML = '';

        const filtradas = listaCategorias.filter((categoria) =>
            categoria.nombre.toLowerCase().includes(filtro)
        );

        filtradas.forEach((categoria) => {
            const numeracion = listaCategorias.indexOf(categoria);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><b>${numeracion + 1}</b></td>
                <td>${categoria.nombre}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-edit" onclick="window.editar(${categoria.id})">Editar</button>
                        <button class="btn btn-danger" onclick="window.eliminar(${categoria.id})">Eliminar</button>
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

    window.editar = function(id) {
        const categoria = listaCategorias.find(c => c.id === id);
        if (!categoria) return;

        document.getElementById('modal-titulo').innerText = 'Editar Categoría';
        document.getElementById('edit-index').value = id;
        document.getElementById('nombre-categoria').value = categoria.nombre;

        document.getElementById('modal').style.display = 'flex';
    }

    window.cerrarModal = function() {
        document.getElementById('modal').style.display = 'none';
    }

    window.guardar = async function(event) {
        event.preventDefault();
        const editId = document.getElementById('edit-index').value;
        const nombre = document.getElementById('nombre-categoria').value.trim();

        if (!nombre) return;

        try {
            const respuesta = await fetch(BASE + "/categorias" + (editId ? "/" + editId : ""), {
                method: editId ? 'PUT' : 'POST',
                headers: encabezados(),
                body: JSON.stringify({ nombre: nombre, descripcion: "" })
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
            window.cerrarModal();
        } catch (e) {
            manejarError({ mensaje: e.message }, false);
        }
    }

    window.eliminar = async function(id) {
        const categoria = listaCategorias.find(c => c.id === id);
        if (!confirm(`¿Estás seguro de eliminar la categoría "${categoria ? categoria.nombre : ''}"?`)) return;

        try {
            const respuesta = await fetch(BASE + "/categorias/" + id, { method: 'DELETE', headers: encabezados() });
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
