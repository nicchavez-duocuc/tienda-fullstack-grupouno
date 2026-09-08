document.addEventListener('DOMContentLoaded', () => {

    const usuariosGuardados = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];

    // 1. LÓGICA DE LOGIN 
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const clave = document.getElementById('clave').value.trim();

            if (!email || !clave) {
                alert('Por favor, ingresa tu correo y clave');
                return;
            }

            const usuarioEncontrado = usuariosGuardados.find(
                user => user.correo === email && user.clave === clave
            );

            if (usuarioEncontrado) {
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
                alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`);
                window.location.href = "../visualizacion_productos/index.html";
            } else {
                alert('Correo o clave incorrectos.');
            }
        });
    }

    //  2. LÓGICA DE REGISTRO
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const fecha = document.getElementById('fecha').value;
            const email = document.getElementById('Gmail').value.trim();
            const password = document.getElementById('clave').value.trim();
            const termsElement = document.getElementById('terms');

            if (!nombre || !apellido || !fecha || !email || !password) {
                alert('Por favor, completa todos los campos del registro.');
                return;
            }
            const fechaNacimiento = new Date(fecha);
            const hoy = new Date();

            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }

            if (edad < 18) {
                alert('Debe ser mayor de 18 años para poder crear la cuenta.');
                return;
            }

            if (termsElement && !termsElement.checked) {
                alert('Debes aceptar los términos y condiciones.');
                return;
            }

            const nuevoUsuario = {
                nombre: `${nombre} ${apellido}`,
                apodo: nombre,
                fechaNacimiento: fecha,
                correo: email,
                clave: password,
                avatar: ""
            };

            usuariosGuardados.push(nuevoUsuario);
            localStorage.setItem('UsuariosGamer', JSON.stringify(usuariosGuardados));
            localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));

            alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
            window.location.href = 'Inicio_Sesion.html';
        });
    }

    //  3. LÓGICA DEL PERFIL 
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

    // --- 4. ACTUALIZAR HEADER DE LA TIENDA ---
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