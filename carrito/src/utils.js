// src/utils.js

// Constante de compatibilidad para archivos que importen CLAVE_CARRITO estáticamente
export const CLAVE_CARRITO = "carritoGamer";

// Lee de forma segura el usuario activo actual desde localStorage
export function obtenerUsuarioActivo() {
    try {
        const usr = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usr && (usr.correo || usr.email)) {
            return {
                ...usr,
                correo: (usr.correo || usr.email).toLowerCase().trim()
            };
        }
    } catch (e) {
        console.error("Error al leer usuarioActivo:", e);
    }
    return null;
}

// Genera dinámicamente la clave para el carrito activo
export function obtenerClaveCarrito() {
    const usuario = obtenerUsuarioActivo();
    if (usuario && usuario.correo) {
        return `carritoGamer_${usuario.correo}`;
    }
    return "carritoGamer_invitado";
}

// Genera dinámicamente la clave para el historial de compras
export function obtenerClaveHistorial() {
    const usuario = obtenerUsuarioActivo();
    if (usuario && usuario.correo) {
        return `historialGamer_${usuario.correo}`;
    }
    return "historialGamer_invitado";
}

// Comprueba si el usuario tiene correo institucional Duoc
export function esUsuarioDuoc() {
    const usuario = obtenerUsuarioActivo();
    if (usuario && usuario.correo) {
        return usuario.correo.endsWith("@duocuc.cl");
    }
    return false;
}

// Lee el carrito activo desde localStorage
export function leerCarrito() {
    try {
        const clave = obtenerClaveCarrito();
        return JSON.parse(localStorage.getItem(clave)) || [];
    } catch {
        return [];
    }
}

// Guarda el carrito activo en localStorage
export function guardarCarrito(carrito) {
    try {
        const clave = obtenerClaveCarrito();
        localStorage.setItem(clave, JSON.stringify(carrito));
    } catch (e) {
        console.error("Error al guardar carrito:", e);
    }
}

// Calcula los precios con o sin descuento Duoc (20%)
export function calcularPrecios(producto, esDuoc) {
    const precioBase = Number(producto.precioOriginal || producto.precio || 0);
    const precioFinal = esDuoc ? Math.round(precioBase * 0.8) : precioBase;
    return { precioBase, precioFinal };
}

// Función unificada para registrar compras en el historial
export function registrarCompraEnHistorial(carritoAProcesar, totalAProcesar) {
    if (!carritoAProcesar || carritoAProcesar.length === 0) {
        console.warn("⚠️ Intento de registrar compra con carrito vacío.");
        return false;
    }

    try {
        const nuevaCompra = {
            idCompra: Date.now(),
            fecha: new Date().toLocaleString("es-CL"),
            productos: JSON.parse(JSON.stringify(carritoAProcesar)),
            total: Number(totalAProcesar) || 0
        };

        const claveHistorial = obtenerClaveHistorial();
        let historial = JSON.parse(localStorage.getItem(claveHistorial)) || [];
        
        historial.unshift(nuevaCompra);
        localStorage.setItem(claveHistorial, JSON.stringify(historial));

        console.log("✅ Compra registrada exitosamente en:", claveHistorial, nuevaCompra);
        return true;
    } catch (error) {
        console.error("❌ Error al guardar historial:", error);
        return false;
    }
}