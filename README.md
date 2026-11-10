# LEVEL-UP GAMER — tienda-fullstack-grupouno-walter

Frontend: Vite + React 19. Backend: Spring Boot (Java 21) en `Backend/productos`.

## Requisitos
- Node.js 18+ (probado con Node 24)
- Java 21 + MySQL o MariaDB (para el backend de Spring Boot)

## Backend (Spring Boot, en Backend/productos)
1. Crear la BD (se crea sola al arrancar: `tienda_gamer`)
2. Editar usuario/clave de MySQL en `src/main/resources/application-mysql.properties` (o `-mariadb`)
3. Correr con Java 21: `./mvnw spring-boot:run` (Linux/Mac) o `mvnw.cmd spring-boot:run` (Windows)
4. Perfil MariaDB: `--spring.profiles.active=mariadb`
5. API documentada en http://localhost:8080/swagger-ui.html

## Frontend (Vite + React)

## Cómo correr (idéntico en Linux/Mac y Windows)

```bash
npm install     # una vez por máquina (NUNCA copies node_modules entre equipos/OS)
npm run dev     # servidor de desarrollo
```

Luego abre http://localhost:5173/ y navega a las páginas:

| Página | URL |
|---|---|
| Tienda | /visualizacion_productos/index.html |
| Carrito | /carrito/carrito.html |
| Login / Registro | /Login/Inicio_Sesion.html, /Login/registrar.html |
| Perfil | /perfil/perfil.html |
| Admin CRUD | /admin/productos/index.html (+ usuarios, categorias, dashboard) |
| Blog | /blogs/blog.html |

## Otros comandos

```bash
npm test         # 10 pruebas unitarias (Vitest)
npm run build    # build de producción a dist/
npm run preview  # sirve el build
```

## Notas
- Los datos viven en localStorage (`carritoGamer`, `usuarioActivo`, `UsuariosGamer`, `resenasGamer`, `productosGamer`).
- Linux es case-sensitive: respeta mayúsculas de carpetas (`Login/`, no `login/`).
- Backend: necesita Java 21 y MySQL; ver `Backend/productos/pom.xml`.
