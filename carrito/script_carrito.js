
function esUsuarioDuoc() {
    // 1. Revisar usuarioActivo (Objeto guardado tras iniciar sesión o registrarse)
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    if (usuarioActivo && usuarioActivo.correo) {
        return usuarioActivo.correo.toLowerCase().trim().endsWith('@duocuc.cl');
    }

    // 2. Revisar lista de usuarios guardados
    const usuariosGuardados = JSON.parse(localStorage.getItem('UsuariosGamer')) || [];
    if (usuariosGuardados.length > 0) {
        const ultimo = usuariosGuardados[usuariosGuardados.length - 1];
        if (ultimo && ultimo.correo) {
            return ultimo.correo.toLowerCase().trim().endsWith('@duocuc.cl');
        }
    }

    return false;
}


// Función principal para renderizar el carrito



function cargarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');
    
    // Obtenemos los datos guardados
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];

    // Validamos si está vacío
    if (carrito.length === 0) {
        if (cartContainer) {
            cartContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Tu carrito está vacío. ¡Ve a la tienda a buscar algo genial!</p>';
        }
        if (cartTotal) cartTotal.innerText = '0';
        return;
    }

    const esDuoc = esUsuarioDuoc();

    // Limpiamos el contenedor y calculamos el total
    if (cartContainer) cartContainer.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        let precioBase = producto.precioOriginal || producto.precio;

        let precioFinal = precioBase;
        if (esDuoc) {
            precioFinal = Math.round(precioBase * 0.80);
        }

        // CORREGIDO: Usamos precioFinal para el subtotal y total
        const subtotal = precioFinal * producto.cantidad;
        total += subtotal;

        let HTMLPrecio = `<p>Precio Unitario: $${precioFinal.toLocaleString('es-CL')}</p>`;
        if (esDuoc) {
            HTMLPrecio = `
                <p>Precio Unitario: <span style="text-decoration: line-through; color: #aaa;">$${precioBase.toLocaleString('es-CL')}</span> 
                <strong style="color: #39FF14;">$${precioFinal.toLocaleString('es-CL')} (20% OFF)</strong></p>
            `;
        }

        const item = document.createElement('div');
        item.className = 'cart-item';
        
        // CORREGIDO: Se inyecta ${HTMLPrecio} en lugar del texto estático
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="item-details">
                <h4 style="color: #39FF14;">${producto.nombre}</h4>
                ${HTMLPrecio}
                <p style="margin-top: 5px;">Subtotal: <strong>$${subtotal.toLocaleString('es-CL')}</strong></p>
            </div>
    
            <!-- Contenedor de botones de cantidad -->
            <div class="quantity-controls">
                <button class="btn-qty" onclick="disminuirCantidad(${index})">-</button>
                <span class="qty-display">${producto.cantidad}</span>
                <button class="btn-qty" onclick="aumentarCantidad(${index})">+</button>
            </div>
    
            <button class="btn-remove" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        
        if (cartContainer) cartContainer.appendChild(item);
    });

    // Actualizamos el texto del total una sola vez
    if (cartTotal) {
        cartTotal.innerText = total.toLocaleString('es-CL');
    }
}

// Función para eliminar un producto específico
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    carrito.splice(index, 1); // Quita el elemento del arreglo
    localStorage.setItem('carritoGamer', JSON.stringify(carrito)); // Guarda el nuevo arreglo
    cargarCarrito(); // Vuelve a cargar la vista
}



let accionPendiente = null; // Variable para recordar qué botón presionaste

// Función maestra MEJORADA: Ahora acepta un parámetro 'esAlerta'
function abrirModalConfirmacion(mensaje, icono, textoBoton, colorFondo, colorTexto, funcionAEjecutar, esAlerta = false) {
    document.getElementById('modal-mensaje').innerText = mensaje;
    document.getElementById('modal-icono').innerText = icono;
    
    const btnConfirmar = document.getElementById('btn-confirmar-accion');
    const btnCancelar = document.querySelector('.btn-cancelar'); // Buscamos el botón cancelar
    
    btnConfirmar.innerText = textoBoton;
    btnConfirmar.style.backgroundColor = colorFondo;
    btnConfirmar.style.color = colorTexto;
    
    // Si es solo un aviso (alerta), escondemos el botón de Cancelar
    if (esAlerta) {
        btnCancelar.style.display = 'none';
    } else {
        btnCancelar.style.display = 'inline-block'; // Lo mostramos si es una pregunta
    }
    
    accionPendiente = funcionAEjecutar;
    document.getElementById('modal-confirmacion').style.display = 'flex';
}

function cerrarModalConfirmacion() {
    document.getElementById('modal-confirmacion').style.display = 'none';
    accionPendiente = null;
}

function ejecutarAccion() {
    if (accionPendiente) accionPendiente(); // Ejecuta la función si existe
    cerrarModalConfirmacion(); // Cierra el modal de todas formas
}

// --- FUNCIONES DE LOS BOTONES ---

function vaciarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    
    if (carrito.length === 0) {
        // En lugar del alert, llamamos al modal en modo "Alerta" (con el true al final)
        abrirModalConfirmacion(
            "Tu carrito ya está vacío. ¡Ve a la tienda a buscar algo genial!", 
            "🛒", "Entendido", "#1E90FF", "white", null, true
        );
        return;
    }

    // Modal en modo "Pregunta" (dos botones)
    abrirModalConfirmacion(
        "¿Confirmas que quieres vaciar tu carro de compras?", 
        "⚠️", "Vaciar Carrito", "#ff3333", "white", 
        function() {
            localStorage.removeItem('carritoGamer');
            cargarCarrito();
        },
        false
    );
}

function procederPago() {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    
    if (carrito.length === 0) {
        // Modal de aviso si está vacío
        abrirModalConfirmacion(
            "No tienes productos en tu carrito. ¡Agrega algunos antes de comprar!", 
            "🛒", "Entendido", "#1E90FF", "white", null, true
        );
        return;
    }

    // Modal de pregunta para confirmar la compra
    abrirModalConfirmacion(
        "¿Confirmas que deseas proceder con el pago de tus productos?", 
        "💳", "Comprar", "#39FF14", "black", 
        function() {
            // 1. Limpiamos el carrito automáticamente de inmediato
            localStorage.removeItem('carritoGamer');
            cargarCarrito();

            // 2. Mostramos el mensaje de éxito (con el fondo ya vacío)
            abrirModalConfirmacion(
                "¡Pago procesado con éxito! Gracias por elegir LEVEL-UP GAMER.",
                "✅", "Genial", "#39FF14", "black",
                null, // Como ya vaciamos el carro, no se necesita ejecutar nada al cerrar
                true // Es una alerta de éxito
            );
        },
        false
    );
}


// esta aumenta la cantidad del producto
function aumentarCantidad(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    carrito[index].cantidad += 1;
    localStorage.setItem('carritoGamer', JSON.stringify(carrito));
    cargarCarrito(); // Recarga la vista para actualizar los subtotales
}

function disminuirCantidad(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    // Solo disminuye si hay más de 1. Si es 1, lo elimina del carrito.
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
        localStorage.setItem('carritoGamer', JSON.stringify(carrito));
        cargarCarrito();
    } else {
        eliminarDelCarrito(index);
    }
}



// Ejecutar la función cuando el documento haya cargado
document.addEventListener('DOMContentLoaded', cargarCarrito);

