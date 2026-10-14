# Cómo instalar y correr esto en tu proyecto

Estos archivos asumen que vas a usar **Vite** como bundler (es el estándar
actual para React y el que da menos dolores de cabeza). Si en Visual Studio
instalaste React con Create React App en vez de Vite, avísame y te doy
la versión adaptada.

## 1. Copiar archivos a tu proyecto

Copia todo el contenido de esta carpeta a la raíz de tu proyecto,
reemplazando tu `index.html`, `Script.js` y `estilo.css` actuales.
La carpeta `src/` (con `main.jsx`, `ProductGrid.jsx`, `productos.js`) va
también en la raíz, al lado de `index.html`.

## 2. Instalar dependencias

Desde la raíz del proyecto (donde vas a tener `index.html` y `vite.config.js`):

```bash
npm init -y                     # solo si todavía no tienes package.json
npm install react react-dom
npm install -D vite @vitejs/plugin-react
```

## 3. Agregar scripts al package.json

Dentro de `package.json`, en la sección `"scripts"`, agrega:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 4. Correr en modo desarrollo

```bash
npm run dev
```

Esto levanta un servidor local (normalmente `http://localhost:5173`).
Ábrelo en el navegador: ahí deberías ver la tienda funcionando igual que
antes, pero la sección de productos ahora la dibuja React.

## 5. Generar la versión final (build)

Cuando quieras "compilar" todo para subirlo a un hosting:

```bash
npm run build
```

Esto genera una carpeta `dist/` con el HTML/CSS/JS ya optimizados y listos
para publicar.
