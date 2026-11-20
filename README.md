# LEVEL-UP GAMER — tienda fullstack

Frontend: Vite + React 19. Backend: Spring Boot (Java 21) en `Backend/productos`, con base de datos MySQL/MariaDB gestionada por Flyway.

## Requisitos

- Node.js 18+ (probado con Node 24)
- Java 21 + MySQL o MariaDB (para el backend de Spring Boot)

## Backend (Spring Boot, en `Backend/productos`)

La BD `tienda_gamer` se crea sola al arrancar y Flyway aplica las migraciones
(`db/migration/V1__esquema.sql`, `V2__datos.sql`, `V3__integridad_carrito_resenas.sql`).

### MySQL con Laragon (opcion por defecto)

Laragon trae MySQL 8 con el usuario `root` SIN clave por defecto. Con eso,
el backend arranca sin configurar nada:

```bash
mvnw.cmd spring-boot:run        # Windows (Laragon)
./mvnw spring-boot:run          # Linux/Mac
```

Si tu MySQL tiene clave, pasala con variables de entorno (no hace falta editar
ningun archivo):

```bash
# Windows (CMD)
set DB_PASSWORD=tu_clave
mvnw.cmd spring-boot:run

# Windows (PowerShell)
$env:DB_PASSWORD="tu_clave"
mvnw.cmd spring-boot:run
```

### MariaDB (por ejemplo en Linux)

El perfil `mariadb` se activa asi:

```bash
# Windows
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=mariadb

# Linux/Mac
./mvnw spring-boot:run -Dspring-boot.run.profiles=mariadb
```

Las tres variables de entorno que entienden los perfiles (todas tienen valor
por defecto, asi que solo hay que definir las que cambien):

| Variable | Para que sirve | Valor por defecto |
|---|---|---|
| `DB_URL` | URL JDBC completa (host, puerto, nombre de BD y parametros) | `jdbc:mysql://localhost:3306/tienda_gamer?...` (perfil mysql) / `jdbc:mariadb://localhost:3306/tienda_gamer?createDatabaseIfNotExist=true` (perfil mariadb) |
| `DB_USER` | Usuario de la base de datos | `root` |
| `DB_PASSWORD` | Clave del usuario | vacia |

Para correr con MariaDB en Linux (usuario/clave propios):

```bash
export DB_URL="jdbc:mariadb://localhost:3306/tienda_gamer?createDatabaseIfNotExist=true"
export DB_USER="nico"
export DB_PASSWORD="mi_clave"
./mvnw spring-boot:run -Dspring-boot.run.profiles=mariadb
```

En Windows (CMD) lo mismo con `set DB_URL=...` (sin comillas) y en PowerShell
con `$env:DB_URL="..."`.

Notas:
- No hace falta crear la BD a mano: `createDatabaseIfNotExist=true` la crea.
- Si la BD ya existia de una corrida anterior, `spring.flyway.baseline-on-migrate=true`
  evita que Flyway se queje y aplica las migraciones que falten.
- La migracion `V3` usa restricciones CHECK: se exigen en MySQL 8.0.16+ y
  MariaDB 10.2+ (cualquier version actual).
- API documentada en http://localhost:8080/swagger-ui.html

Cuentas de prueba que siembra `V2` (clave en la tabla, en texto plano aqui):

| Correo | Clave | Rol |
|---|---|---|
| admin@levelup.cl | Admin123. | ADMIN |
| vendedor@levelup.cl | Vendedor123. | VENDEDOR |
| comprador@levelup.cl | Comprador123. | COMPRADOR |
| katrina@duocuc.cl | Katrina123. | COMPRADOR (prueba el descuento Duoc del 20%) |

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
| Blog | /blogs/blog.html (+ casouno.html, casodos.html) |
| Admin Dashboard | /admin/dashboard/index.html (solo ADMIN) |
| Admin CRUD | /admin/productos/index.html (+ usuarios, categorias) |

## Otros comandos

```bash
npm test         # 10 pruebas unitarias (Vitest)
npm run build    # build de producción a dist/
npm run preview  # sirve el build
```

## Notas

- La sesión vive en localStorage (`jwtActivo`, `usuarioActivo`), pero el
  **carrito y las reseñas viven en la base de datos**: para usarlos hay que
  iniciar sesión.
- El catálogo se lee del backend; si el backend está apagado, la tienda muestra
  el catálogo local de respaldo (`visualizacion_productos/src/productos.js`).
- Linux es case-sensitive: respeta mayúsculas de carpetas (`Login/`, no `login/`).
- Backend: necesita Java 21; ver `Backend/productos/pom.xml`.
