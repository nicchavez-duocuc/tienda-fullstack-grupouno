    // Carga de datos simulados/reales desde localStorage para llenar métricas informativas en el dashboard
    document.addEventListener('DOMContentLoaded', () => {
        // Productos
        try {
            const prodLocal = localStorage.getItem('productosGamer');
            if (prodLocal) {
                const parsed = JSON.parse(prodLocal);
                document.getElementById('stat-productos').textContent = parsed.length;
            } else {
                document.getElementById('stat-productos').textContent = '21'; // Valor por defecto base
            }
        } catch(e) {
            document.getElementById('stat-productos').textContent = '21';
        }

        // Categorías
        try {
            const catLocal = localStorage.getItem('categoriasGamer');
            if (catLocal) {
                const parsed = JSON.parse(catLocal);
                document.getElementById('stat-categorias').textContent = parsed.length;
            } else {
                document.getElementById('stat-categorias').textContent = '11'; // Valor por defecto base
            }
        } catch(e) {
            document.getElementById('stat-categorias').textContent = '11';
        }

        // Usuarios (lee de localStorage o asigna un valor referencial si no existe aún)
        try {
            const userLocal = localStorage.getItem('usuarios') || localStorage.getItem('usuariosGamer');
            if (userLocal) {
                const parsed = JSON.parse(userLocal);
                document.getElementById('stat-usuarios').textContent = parsed.length;
            } else {
                document.getElementById('stat-usuarios').textContent = '4';
            }
        } catch(e) {
            document.getElementById('stat-usuarios').textContent = '4';
        }
    });