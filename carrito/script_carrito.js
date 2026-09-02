// Función principal para renderizar el carrito

function cargarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');
    
    // Obtenemos los datos guardados
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];

    // Validamos si está vacío
    if (carrito.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Tu carrito está vacío. ¡Ve a la tienda a buscar algo genial!</p>';
        cartTotal.innerText = '0';
        return;
    }

    // Limpiamos el contenedor y calculamos el total
    cartContainer.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement('div');
        item.className = 'cart-item';
        
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="item-details">
                <h4>${producto.nombre}</h4>
                <p>Precio Unitario: $${producto.precio.toLocaleString('es-CL')}</p>
                <p style="margin-top: 5px;">Subtotal: <strong>$${subtotal.toLocaleString('es-CL')}</strong></p>
            </div>
    
            <!-- NUEVO: Contenedor de botones de cantidad -->
            <div class="quantity-controls">
                <button class="btn-qty" onclick="disminuirCantidad(${index})">-</button>
                <span class="qty-display">${producto.cantidad}</span>
                <button class="btn-qty" onclick="aumentarCantidad(${index})">+</button>
            </div>
    
            <button class="btn-remove" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        
        cartContainer.appendChild(item);
    });

    // Actualizamos el texto del total
    cartTotal.innerText = total.toLocaleString('es-CL');
}

// Función para eliminar un producto específico
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoGamer')) || [];
    carrito.splice(index, 1); // Quita el elemento del arreglo
    localStorage.setItem('carritoGamer', JSON.stringify(carrito)); // Guarda el nuevo arreglo
    cargarCarrito(); // Vuelve a cargar la vista
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    if(confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
        localStorage.removeItem('carritoGamer');
        cargarCarrito();
    }
}

// Agrega estas nuevas funciones al final de tu script_carrito.js
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

