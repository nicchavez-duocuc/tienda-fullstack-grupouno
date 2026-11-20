import { describe, it, expect, beforeEach } from 'vitest';

// Importar directamente los servicios reales del proyecto
import { calcularEdad } from '../Login/src/services/edad.jsx';
import {
  CLAVE_USUARIOS,
  CLAVE_USUARIO_ACTIVO,
  obtenerUsuarios,
  guardarUsuarioActivo,
  iniciarSesion,
  registrarUsuario
} from '../Login/src/services/usuarios.jsx';
import {
  CLAVE_CARRITO,
  leerCarrito,
  guardarCarrito,
  eliminarCarrito
} from '../carrito/src/services/carrito.jsx';
import {
  FACTOR_DUOC,
  calcularPrecios
} from '../carrito/src/services/precios.jsx';

describe('Suite Completa de Pruebas Unitarias - Servicios React', () => {

  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba para aislar los resultados
    localStorage.clear();
  });


  // VALIDACIÓN DE EDAD Y REGISTRO 

  describe('1. Servicio de Edad y Registro (edad.jsx y usuarios.jsx)', () => {

    it('1. Debe calcular correctamente la edad considerando día y mes de nacimiento', () => {
      // Usamos una fecha fija de hace 20 años exactos
      const hoy = new Date();
      const anio = hoy.getFullYear() - 20;
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');

      const edad = calcularEdad(`${anio}-${mes}-${dia}`);
      expect(edad).toBe(20);
    });

    it('2. Debe registrar un nuevo usuario, guardarlo en UsuariosGamer y dejarlo como sesión activa', () => {
      const datosRegistro = {
        nombre: 'Sebastian',
        apellido: 'Perez',
        fecha: '2000-05-15',
        correo: 'seba@duocuc.cl',
        clave: 'password123'
      };

      const creado = registrarUsuario(datosRegistro);

      expect(creado.nombre).toBe('Sebastian Perez');
      expect(creado.apodo).toBe('Sebastian');
      expect(obtenerUsuarios()).toHaveLength(1);

      const activo = JSON.parse(localStorage.getItem(CLAVE_USUARIO_ACTIVO));
      expect(activo.correo).toBe('seba@duocuc.cl');
    });

    it('3. Debe devolver un arreglo vacío si localStorage tiene datos corruptos o está vacío', () => {
      expect(obtenerUsuarios()).toEqual([]);

      localStorage.setItem(CLAVE_USUARIOS, '{json_invalido');
      expect(obtenerUsuarios()).toEqual([]);
    });

  });


  //  AUTENTICACIÓN E INICIO DE SESIÓN 

  describe('2. Servicio de Autenticación (usuarios.jsx)', () => {

    it('4. Debe iniciar sesión exitosamente si el correo y la contraseña coinciden', () => {
      registrarUsuario({
        nombre: 'Gamer',
        apellido: 'Pro',
        fecha: '1999-01-01',
        correo: 'gamer@test.com',
        clave: 'secret123'
      });

      const usuarioEncontrado = iniciarSesion('gamer@test.com', 'secret123');
      expect(usuarioEncontrado).not.toBeNull();
      expect(usuarioEncontrado.correo).toBe('gamer@test.com');
    });

    it('5. Debe devolver null si las credenciales son incorrectas', () => {
      registrarUsuario({
        nombre: 'Gamer',
        apellido: 'Pro',
        fecha: '1999-01-01',
        correo: 'gamer@test.com',
        clave: 'secret123'
      });

      const resultado = iniciarSesion('gamer@test.com', 'claveErronea');
      expect(resultado).toBeNull();
    });

  });


  // PERSISTENCIA DEL CARRITO 

  describe('3. Servicio de Carrito de Compras (carrito.jsx)', () => {

    it('6. Debe devolver un carrito vacío si no hay productos guardados en localStorage', () => {
      expect(leerCarrito()).toEqual([]);
    });

    it('7. Debe guardar y leer correctamente los productos agregados al carrito', () => {
      const productosMock = [
        { codigo: 101, nombre: 'Teclado Mecánico', precio: 35000, cantidad: 1 },
        { codigo: 102, nombre: 'Mouse Gamer', precio: 20000, cantidad: 2 }
      ];

      guardarCarrito(productosMock);

      const carritoLeido = leerCarrito();
      expect(carritoLeido).toHaveLength(2);
      expect(carritoLeido[0].nombre).toBe('Teclado Mecánico');
      expect(carritoLeido[1].cantidad).toBe(2);
    });

    it('8. Debe eliminar por completo la clave carritoGamer al vaciar o pagar el carrito', () => {
      guardarCarrito([{ codigo: 101, nombre: 'Audífonos', precio: 25000, cantidad: 1 }]);
      expect(localStorage.getItem(CLAVE_CARRITO)).not.toBeNull();

      eliminarCarrito();

      expect(localStorage.getItem(CLAVE_CARRITO)).toBeNull();
      expect(leerCarrito()).toEqual([]);
    });

  });


  //  CÁLCULO DE PRECIOS Y DESCUENTO DUOC 

  describe('4. Servicio de Precios y Descuentos (precios.jsx)', () => {

    it('9. Debe mantener el precio base sin descuento cuando el usuario no es Duoc', () => {
      const producto = { nombre: 'Monitor 144Hz', precio: 150000 };
      const { precioBase, precioFinal } = calcularPrecios(producto, false);

      expect(precioBase).toBe(150000);
      expect(precioFinal).toBe(150000);
    });

    it('10. Debe aplicar el 20% de descuento (FACTOR_DUOC) cuando es usuario Duoc', () => {
      const producto = { nombre: 'Silla Gamer', precio: 100000 };
      const { precioBase, precioFinal } = calcularPrecios(producto, true);

      expect(FACTOR_DUOC).toBe(0.8);
      expect(precioBase).toBe(100000);
      expect(precioFinal).toBe(80000);
    });

  });

});