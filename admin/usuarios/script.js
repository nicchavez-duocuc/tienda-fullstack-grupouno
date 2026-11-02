    document.addEventListener('DOMContentLoaded', () => {
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

        // Función para cargar la lista de usuarios
        function cargarUsuariosEnSelect() {
            selectLista.innerHTML = '';
            const usuarios = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];

            if (usuarios.length === 0) {
                const opt = document.createElement('option');
                opt.textContent = 'No hay usuarios registrados';
                opt.disabled = true;
                selectLista.appendChild(opt);
                return;
            }

            usuarios.forEach(usr => {
                const correoUser = usr.correo || usr.email || 'sin-correo';
                const option = document.createElement('option');
                option.value = correoUser;
                option.textContent = `${usr.apodo || usr.nombre || 'Gamer'} (${correoUser})`;
                selectLista.appendChild(option);
            });
        }

        // Inicializar
        cargarUsuariosEnSelect();

        // Cargar datos e historial del usuario seleccionado
        btnCargar.addEventListener('click', () => {
            const correoSeleccionado = selectLista.value;
            if (!correoSeleccionado) {
                alert('Por favor selecciona un usuario de la lista.');
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];
            const usuario = usuarios.find(usr => (usr.correo || usr.email) === correoSeleccionado);

            if (usuario) {
                const correoUser = usuario.correo || usuario.email || '';
                inputCorreoOriginal.value = correoUser;
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

                // --- BÚSQUEDA Y LECTURA DEL HISTORIAL NORMALIZADO ---
                const correoNormalizado = correoUser.toLowerCase().trim();
                const claveHistorialUser = `historialGamer_${correoNormalizado}`;
                
                console.log("🔍 Buscando historial en la clave:", claveHistorialUser);
                const historialUsuario = JSON.parse(localStorage.getItem(claveHistorialUser)) || [];
                console.log("📦 Historial obtenido:", historialUsuario);

                contenedorHistorial.innerHTML = '';
                if (historialUsuario.length === 0) {
                    contenedorHistorial.innerHTML = '<span style="color: #888;">No hay compras registradas para este usuario.</span>';
                } else {
                    historialUsuario.forEach((compra, index) => {
                        const purchaseBox = document.createElement('div');
                        purchaseBox.className = 'purchase-box';

                        let htmlItems = `
                            <div class="purchase-header">
                                <span>Compra #${historialUsuario.length - index} (${compra.fecha || 'Fecha desconocida'})</span>
                                <span>Total: $${Number(compra.total || 0).toLocaleString('es-CL')}</span>
                            </div>
                        `;

                        if (compra.productos && Array.isArray(compra.productos)) {
                            compra.productos.forEach(item => {
                                const precioItem = item.precio || 0;
                                const cantItem = item.cantidad || 1;
                                htmlItems += `
                                    <div class="purchase-item">
                                        <span>• ${item.nombre} (x${cantItem})</span>
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
            }
        });

        // Actualizar usuario (UPDATE)
        btnActualizar.addEventListener('click', () => {
            const correoOriginal = inputCorreoOriginal.value;
            const nuevoApodo = inputApodo.value.trim();
            const nuevaClave = inputClave.value.trim();

            let usuarios = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];

            usuarios = usuarios.map(usr => {
                const cUser = usr.correo || usr.email;
                if (cUser === correoOriginal) {
                    usr.apodo = nuevoApodo;
                    if (nuevaClave) {
                        usr.clave = nuevaClave;
                    }
                }
                return usr;
            });

            localStorage.setItem('UsuariosGamer', JSON.stringify(usuarios));
            alert('¡Perfil actualizado con éxito!');
            cargarUsuariosEnSelect();
        });

        // Eliminar usuario (DELETE)
        btnEliminar.addEventListener('click', () => {
            const correoOriginal = inputCorreoOriginal.value;

            if (confirm(`¿Estás seguro de eliminar al usuario: ${correoOriginal}?`)) {
                let usuarios = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];
                usuarios = usuarios.filter(usr => (usr.correo || usr.email) !== correoOriginal);

                localStorage.setItem('UsuariosGamer', JSON.stringify(usuarios));
                
                // Limpiar también su carrito e historial
                const correoNormalizado = correoOriginal.toLowerCase().trim();
                localStorage.removeItem(`carritoGamer_${correoNormalizado}`);
                localStorage.removeItem(`historialGamer_${correoNormalizado}`);

                alert('Usuario eliminado correctamente.');

                panelEdicion.style.display = 'none';
                mensajeSeleccion.style.display = 'block';
                cargarUsuariosEnSelect();
            }
        });
    });