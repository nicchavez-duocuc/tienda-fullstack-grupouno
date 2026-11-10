    // Carga de métricas del dashboard desde el backend (solo ADMIN):
    // GET /api/v1/dashboard -> { productos, categorias, usuarios, pedidos }
    document.addEventListener('DOMContentLoaded', async () => {
        const BASE = "http://localhost:8080/api/v1";
        const encabezados = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (localStorage.getItem("jwtActivo") || "")
        };

        try {
            const respuesta = await fetch(BASE + "/dashboard", { headers: encabezados });

            // Sin sesión (401) o sin permiso (403): ir a iniciar sesión
            if (respuesta.status === 401 || respuesta.status === 403) {
                alert("Necesitas iniciar sesión como ADMIN para ver el dashboard.");
                window.location.href = "../Login/Inicio_Sesion.html";
                return;
            }

            const metricas = await respuesta.json();

            document.getElementById('stat-productos').textContent = metricas.productos ?? '-';
            document.getElementById('stat-categorias').textContent = metricas.categorias ?? '-';
            document.getElementById('stat-usuarios').textContent = metricas.usuarios ?? '-';
        } catch (e) {
            alert("No se pudo contactar al backend: " + e.message);
        }
    });
