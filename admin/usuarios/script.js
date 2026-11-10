    // Panel de usuarios: CRUD sobre GET/PUT/DELETE /api/v1/usuarios (solo ADMIN).
    // El historial de compras sale de GET /api/v1/usuarios/{id}/pedidos, que
    // devuelve los pedidos PAGADO del usuario con sus detalles
    document.addEventListener('DOMContentLoaded', () => {
        const BASE = "http://localhost:8080/api/v1";

        const selectLista = document.getElementById('lista-usuarios');
        const btnCargar = document.getElementById('btn-cargar');
        const panelEdicion = document.getElementById('panel-edicion');
        const mensajeSeleccion = document.getElementById('mensaje-seleccion');

        const inputCorreoOriginal = document.getElementById('edit-correo-original');
        const inputCorreo = document.getElementById('edit-correo');
        const inputApodo = document.getElementById('edit-apodo');
        const inputClave = document.getElementById('edit-clave');
        const imgAvatar = document.getElementById('ver-avatar');
        const contenedorHistorial = document.getElementById('contenedor-historial');

        const btnActualizar = document.getElementById('btn-actualizar');
        const btnEliminar = document.getElementById('btn-eliminar');

        let usuarioSeleccionado = null;

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

        async function pedir(ruta, opciones = {}) {
            const respuesta = await fetch(BASE + ruta, { headers: encabezados(), ...opciones });
            if (respuesta.status === 401 || respuesta.status === 403) {
                manejarError({}, true);
                throw new Error('sin permiso');
            }
            if (!respuesta.ok && respuesta.status !== 204) {
                const error = await respuesta.json().catch(() => ({}));
                manejarError(error, false);
                throw new Error('error');
            }
            return respuesta;
        }

        // Función para cargar la lista de usuarios desde la base de datos
        async function cargarUsuariosEnSelect() {
            selectLista.innerHTML = '';
            usuarioSeleccionado = null;

            try {
                const respuesta = await pedir('/usuarios');
                const usuarios = await respuesta.json();
                // [{id, nombre, apodo, correo, rol, avatar}]

                if (usuarios.length === 0) {
                    const opt = document.createElement('option');
                    opt.textContent = 'No hay usuarios registrados';
                    opt.disabled = true;
                    selectLista.appendChild(opt);
                    return;
                }

                usuarios.forEach(usr => {
                    const option = document.createElement('option');
                    option.value = usr.id;
                    option.textContent = `${usr.apodo || usr.nombre || 'Gamer'} (${usr.correo})`;
                    selectLista.appendChild(option);
                });
            } catch (e) {
                // Los mensajes ya los mostró manejarError
            }
        }

        // Inicializar
        cargarUsuariosEnSelect();

        // Cargar datos e historial del usuario seleccionado
        btnCargar.addEventListener('click', async () => {
            const idSeleccionado = Number(selectLista.value);
            if (!idSeleccionado) {
                alert('Por favor selecciona un usuario de la lista.');
                return;
            }

            try {
                const respuesta = await pedir('/usuarios/' + idSeleccionado);
                const usuario = await respuesta.json();
                usuarioSeleccionado = usuario;
                const correoUser = usuario.correo || '';

                inputCorreoOriginal.value = idSeleccionado;
                inputCorreo.value = correoUser;
                inputApodo.value = usuario.apodo || usuario.nombre || '';
                inputClave.value = '';

                // Avatar
                if (usuario.avatar) {
                    imgAvatar.src = usuario.avatar;
                } else {
                    const nombreAvatar = usuario.apodo || usuario.nombre || 'Gamer';
                    imgAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombreAvatar)}&background=1E90FF&color=fff`;
                }

                // --- HISTORIAL DE COMPRAS DESDE LA BASE DE DATOS ---
                const respuestaHistorial = await pedir('/usuarios/' + idSeleccionado + '/pedidos');
                const historialUsuario = await respuestaHistorial.json();
                // [{id, estado, fecha, total, detalles: [{producto: {nombre}, cantidad, precioUnitario}]}]

                contenedorHistorial.innerHTML = '';
                if (historialUsuario.length === 0) {
                    contenedorHistorial.innerHTML = '<span style="color: #888;">No hay compras registradas para este usuario.</span>';
                } else {
                    historialUsuario.forEach((compra, index) => {
                        const fechaCompra = compra.fecha ? compra.fecha.replace('T', ' ').slice(0, 16) : 'Fecha desconocida';
                        const purchaseBox = document.createElement('div');
                        purchaseBox.className = 'purchase-box';

                        let htmlItems = `
                            <div class="purchase-header">
                                <span>Compra #${historialUsuario.length - index} (${fechaCompra})</span>
                                <span>Total: $${Number(compra.total || 0).toLocaleString('es-CL')}</span>
                            </div>
                        `;

                        if (compra.detalles && Array.isArray(compra.detalles)) {
                            compra.detalles.forEach(item => {
                                const precioItem = item.precioUnitario || 0;
                                const cantItem = item.cantidad || 1;
                                htmlItems += `
                                    <div class="purchase-item">
                                        <span>• ${item.producto ? item.producto.nombre : ''} (x${cantItem})</span>
                                        <span>$${(precioItem * cantItem).toLocaleString('es-CL')}</span>
                                    </div>
                                `;
                            });
                        }

                        purchaseBox.innerHTML = htmlItems;
                        contenedorHistorial.appendChild(purchaseBox);
                    });
                }

                panelEdicion.style.display = 'block';
                mensajeSeleccion.style.display = 'none';
            } catch (e) {
                // Los mensajes ya los mostró manejarError
            }
        });

        // Actualizar usuario (UPDATE): apodo, clave nueva (si escribe una) y rol
        btnActualizar.addEventListener('click', async () => {
            const idOriginal = inputCorreoOriginal.value;
            const nuevoApodo = inputApodo.value.trim();
            const nuevaClave = inputClave.value.trim();
            const nuevoRol = document.getElementById('edit-rol') ? document.getElementById('edit-rol').value : undefined;

            const cambios = { apodo: nuevoApodo };
            if (nuevaClave) {
                cambios.clave = nuevaClave; // el backend la guarda con BCrypt
            }
            if (nuevoRol) {
                cambios.rol = nuevoRol;
            }

            try {
                await pedir('/usuarios/' + idOriginal, {
                    method: 'PUT',
                    body: JSON.stringify(cambios)
                });
                alert('¡Perfil actualizado con éxito!');
                cargarUsuariosEnSelect();
            } catch (e) {
                // Los mensajes ya los mostró manejarError
            }
        });

        // Eliminar usuario (DELETE)
        btnEliminar.addEventListener('click', async () => {
            const idOriginal = inputCorreoOriginal.value;
            const correoOriginal = inputCorreo.value;

            if (confirm(`¿Estás seguro de eliminar al usuario: ${correoOriginal}?`)) {
                try {
                    await pedir('/usuarios/' + idOriginal, { method: 'DELETE' });
                    alert('Usuario eliminado correctamente.');

                    panelEdicion.style.display = 'none';
                    mensajeSeleccion.style.display = 'block';
                    cargarUsuariosEnSelect();
                } catch (e) {
                    // Los mensajes ya los mostró manejarError
                }
            }
        });
    });
