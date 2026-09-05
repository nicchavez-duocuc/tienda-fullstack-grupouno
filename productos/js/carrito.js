// Función auxiliar para leer localStorage sin romper la ejecución
function obtenerCarritoGuardado() {
    try {
        const carrito = localStorage.getItem('carritoGamer');
        return carrito ? JSON.parse(carrito) : [];
    } catch (error) {
        console.error("Error al leer localStorage:", error);
        return [];
    }
}

// Función auxiliar para guardar en localStorage
function guardarCarrito(carrito) {
    try {
        localStorage.setItem('carritoGamer', JSON.stringify(carrito));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
}

// Función principal para renderizar el carrito
function cargarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer || !cartTotal) return;

    let carrito = obtenerCarritoGuardado();

    // Validamos si está vacío
    if (carrito.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Tu carrito está vacío. ¡Ve a la tienda a buscar algo genial!</p>';
        cartTotal.innerText = '0';
        return;
    }

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
    
            <div class="quantity-controls">
                <button class="btn-qty btn-minus">-</button>
                <span class="qty-display">${producto.cantidad}</span>
                <button class="btn-qty btn-plus">+</button>
            </div>
    
            <button class="btn-remove">Eliminar</button>
        `;

        // Asignación limpia de eventos
        item.querySelector('.btn-minus').addEventListener('click', () => disminuirCantidad(index));
        item.querySelector('.btn-plus').addEventListener('click', () => aumentarCantidad(index));
        item.querySelector('.btn-remove').addEventListener('click', () => eliminarDelCarrito(index));
        
        cartContainer.appendChild(item);
    });

    // Actualizamos el texto del total
    cartTotal.innerText = total.toLocaleString('es-CL');
}

// Función para eliminar un producto específico
function eliminarDelCarrito(index) {
    let carrito = obtenerCarritoGuardado();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    cargarCarrito();
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
        localStorage.removeItem('carritoGamer');
        cargarCarrito();
    }
}

// Función para aumentar cantidad
function aumentarCantidad(index) {
    let carrito = obtenerCarritoGuardado();
    const producto = carrito[index];

    if (!producto) return;

    if (producto.stock && producto.cantidad + 1 > producto.stock) {
        alert(`Alcanzaste el límite de stock disponible (${producto.stock} unidades).`);
        return;
    }

    carrito[index].cantidad += 1;
    guardarCarrito(carrito);
    cargarCarrito();
}

// Función para disminuir cantidad
function disminuirCantidad(index) {
    let carrito = obtenerCarritoGuardado();

    if (!carrito[index]) return;

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
        guardarCarrito(carrito);
        cargarCarrito();
    } else {
        eliminarDelCarrito(index);
    }
}

// Asignación del evento vaciar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    
    const btnVaciar = document.getElementById('btn-vaciar-cart');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }
});

// Exposición global de funciones
window.cargarCarrito = cargarCarrito;
window.vaciarCarrito = vaciarCarrito;