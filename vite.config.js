import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Un solo servidor de Vite sirve todas las páginas desde el mismo origen
// (http://localhost:5173), así comparten el localStorage del carrito y de
// usuarios entre ellas.
export default defineConfig({
  plugins: [react()],
  build: {
    // Solo se usa con "npm run build": lista las páginas a compilar.
    // Agrega aquí cualquier otra página que conviertas más adelante
    // (por ejemplo perfil/perfil.html).
    rollupOptions: {
      input: {
        tienda: fileURLToPath(new URL('./visualizacion_productos/index.html', import.meta.url)),
        carrito: fileURLToPath(new URL('./carrito/carrito.html', import.meta.url)),
        login: fileURLToPath(new URL('./login/Inicio_Sesion.html', import.meta.url)),
        registro: fileURLToPath(new URL('./login/registrar.html', import.meta.url)),
      },
    },
  },
});
