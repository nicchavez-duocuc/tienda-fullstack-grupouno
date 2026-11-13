import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Carpeta raíz del proyecto (donde está este vite.config.js)
const raiz = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],

  build: {
    // El build se genera en dist/ y se limpia antes de cada compilación
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Vite arma una página por cada HTML del proyecto y conserva su ruta.
      // Ejemplo: admin/dashboard/index.html -> dist/admin/dashboard/index.html
      input: {
        inicioSesion: resolve(raiz, 'Login/Inicio_Sesion.html'),
        registro: resolve(raiz, 'Login/registrar.html'),
        tienda: resolve(raiz, 'visualizacion_productos/index.html'),
        carrito: resolve(raiz, 'carrito/carrito.html'),
        perfil: resolve(raiz, 'perfil/perfil.html'),
        blog: resolve(raiz, 'blogs/blog.html'),
        casoUno: resolve(raiz, 'blogs/casouno.html'),
        casoDos: resolve(raiz, 'blogs/casodos.html'),
        adminDashboard: resolve(raiz, 'admin/dashboard/index.html'),
        adminCategorias: resolve(raiz, 'admin/categorias/index.html'),
        adminProductos: resolve(raiz, 'admin/productos/index.html'),
        adminUsuarios: resolve(raiz, 'admin/usuarios/index.html')
      }
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}']
  }
});
