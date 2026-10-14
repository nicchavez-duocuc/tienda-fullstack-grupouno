// usuarios.js
// Los bloques "1. LÓGICA DE LOGIN" y "2. LÓGICA DE REGISTRO" se movieron a
// src/LoginForm.jsx y src/RegisterForm.jsx (con src/usuariosUtils.js como
// apoyo). Este archivo sigue siendo un script clásico (sin import/export)
// porque perfil.html y el header de la tienda todavía lo cargan tal cual.

document.addEventListener('DOMContentLoaded', () => {

    //  1. LÓGICA DEL PERFIL
    const profileForm = document.getElementById('profile-form');
    const avatarInput = document.getElementById('avatar-input');
    const avatarPreview = document.getElementById('avatar-preview');
    let avatarBase64 = "";

    if (profileForm) {
        let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

        if (!usuarioActivo) {
            alert('No hay una sesión activa. Redirigiendo al Login.');
            window.location.href = 'Inicio_Sesion.html';
        } else {
            if (document.getElementById('apodo')) {
                document.getElementById('apodo').value = usuarioActivo.apodo || usuarioActivo.nombre || '';
            }
            if (usuarioActivo.avatar && avatarPreview) {
                avatarPreview.src = usuarioActivo.avatar;
                avatarBase64 = usuarioActivo.avatar;
            }
        }

        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    if (avatarPreview) {
                        avatarPreview.src = URL.createObjectURL(file);
                    }

                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        avatarBase64 = evt.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

            const nuevoApodo = document.getElementById('apodo').value.trim();
            const claveAnteriorInput = document.getElementById('clave-anterior').value.trim();
            const claveNuevaInput = document.getElementById('clave-nueva').value.trim();

            if (claveAnteriorInput || claveNuevaInput) {
                if (claveAnteriorInput !== usuarioActivo.clave) {
                    alert('Error: La contraseña actual es incorrecta.');
                    return;
                }
                if (!claveNuevaInput) {
                    alert('Por favor ingresa la nueva contraseña.');
                    return;
                }
                usuarioActivo.clave = claveNuevaInput;
            }

            usuarioActivo.apodo = nuevoApodo;
            if (avatarBase64) {
                usuarioActivo.avatar = avatarBase64;
            }

            let usuarios = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];
            usuarios = usuarios.map(usr => {
                if (usr.correo === usuarioActivo.correo) {
                    return { ...usr, ...usuarioActivo };
                }
                return usr;
            });

            localStorage.setItem('UsuariosGamer', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

            document.getElementById('clave-anterior').value = '';
            document.getElementById('clave-nueva').value = '';

            alert('¡Perfil actualizado con éxito!');
        });
    }

    // --- 2. ACTUALIZAR HEADER DE LA TIENDA ---
    const headerAvatar = document.getElementById('header-avatar');
    const headerApodo = document.getElementById('header-apodo');
    const usuarioActivoHeader = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (usuarioActivoHeader) {
        if (headerApodo) {
            headerApodo.textContent = usuarioActivoHeader.apodo || usuarioActivoHeader.nombre || 'Gamer';
        }
        if (headerAvatar) {
            if (usuarioActivoHeader.avatar) {
                headerAvatar.src = usuarioActivoHeader.avatar;
            } else {
                const nombreParaAvatar = usuarioActivoHeader.apodo || usuarioActivoHeader.nombre || 'Gamer';
                headerAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nombreParaAvatar)}&background=1E90FF&color=fff`;
            }
        }
    }

});
