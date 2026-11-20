// services/edad.jsx
// Cálculo de edad a partir de la fecha de nacimiento. Función pura.
// (Antes estaba en usuariosUtils.js.)

// Misma cuenta de edad de siempre (considera día y mes de cumpleaños), pero
// comparando los números de la fecha directamente: `new Date("aaaa-mm-dd")`
// parsea en UTC y con el huso horario de Chile el cumpleaños quedaba corrido
// un día (un menor de 18 podía registrarse el día anterior a su cumpleaños).
export function calcularEdad(fechaNacimientoStr) {
    const partes = String(fechaNacimientoStr || "").split("-").map(Number);
    const anioNacimiento = partes[0];
    const mesNacimiento = partes[1]; // 1-12
    const diaNacimiento = partes[2]; // 1-31

    if (!anioNacimiento || !mesNacimiento || !diaNacimiento) return 0;

    const hoy = new Date();
    let edad = hoy.getFullYear() - anioNacimiento;

    // Aún no cumplió años este año (comparación con mes/día locales)
    const mesHoy = hoy.getMonth() + 1;
    if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && hoy.getDate() < diaNacimiento)) {
        edad--;
    }
    return edad;
}
