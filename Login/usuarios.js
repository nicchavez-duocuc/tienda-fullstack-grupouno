document.addEventListener('DOMContentLoaded', () => {

  
    const usuariosGuardados = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];

   
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
                localStorage.setItem('usuarioActivo',JSON.stringify(usuarioEncontrado));
                alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`);
                window.location.href = "../visualizacion_productos/index.html";
            } else {
                alert('Correo o clave incorrectos.');
            }
        });
    }

   
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
            const fechaNacimiento = new Date(fecha)
            const hoy =new Date();

            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes=hoy.getMonth() - fechaNacimiento.getMonth();

            if(mes< 0 || (mes === 0 && hoy.getDate()< fechaNacimiento.getDate())){
                edad--;
            }

            if(edad < 18){
                alert('debe ser mayor de 18 años para poder crear la cuenta ');
                return;
            }

            if (termsElement && !termsElement.checked) {
                alert('Debes aceptar los términos y condiciones.');
                return;
            }

            
            const nuevoUsuario = {
                nombre: `${nombre} ${apellido}`,
                fechaNacimiento: fecha,
                correo: email,
                clave: password
            };

            usuariosGuardados.push(nuevoUsuario);
            localStorage.setItem('UsuariosGamer', JSON.stringify(usuariosGuardados));

            localStorage.setItem('usuarioActivo', JSON.stringify(nuevoUsuario));
            

            alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
            window.location.href = 'Inicio_Sesion.html';
        });
    }
});