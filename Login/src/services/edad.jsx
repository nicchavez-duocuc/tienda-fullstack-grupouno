// services/edad.jsx
// Cálculo de edad a partir de la fecha de nacimiento. Función pura.
// (Antes estaba en usuariosUtils.js.)

// Misma cuenta de edad de siempre (considera día y mes de cumpleaños)
export function calcularEdad(fechaNacimientoStr) {
    const fechaNacimiento = new Date(fechaNacimientoStr);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}
