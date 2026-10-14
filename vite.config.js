import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupTests.js',
  },
  build: {
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
