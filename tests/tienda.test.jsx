import { describe, it, expect, beforeEach } from 'vitest';

// --- FUNCIONES AUXILIARES A PROBAR ---
const agregarAlCarrito = (carrito, producto) => [...carrito, producto];
const calcularTotal = (carrito) => carrito.reduce((sum, item) => sum + item.precio, 0);
const vaciarCarrito = () => [];
const validarLogin = (email, password) => email.includes('@') && password.length >= 6;
const registrarUsuario = (usuarios, nuevoUsuario) => {
  if (usuarios.some(u => u.email === nuevoUsuario.email)) {
    throw new Error('El usuario ya existe');
  }
  return [...usuarios, nuevoUsuario];
};

describe('Suite de 10 Pruebas Unitarias del Proyecto Fullstack', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // --- CARRITO ---
  it('1. Debe agregar un producto al carrito correctamente', () => {
    const carrito = [];
    const producto = { id: 1, nombre: 'Polera', precio: 10000 };
    const resultado = agregarAlCarrito(carrito, producto);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nombre).toBe('Polera');
  });

  it('2. Debe calcular correctamente el total a pagar del carrito', () => {
    const carrito = [
      { id: 1, precio: 10000 },
      { id: 2, precio: 15000 },
    ];
    const total = calcularTotal(carrito);
    expect(total).toBe(25000);
  });

  it('3. Debe retornar 0 al calcular el total de un carrito vacío', () => {
    const total = calcularTotal([]);
    expect(total).toBe(0);
  });

  it('4. Debe vaciar todos los elementos del carrito', () => {
    const carrito = [{ id: 1, precio: 5000 }];
    const carritoVacio = vaciarCarrito();
    expect(carritoVacio).toHaveLength(0);
  });

  // --- LOCALSTORAGE ---
  it('5. Debe guardar datos del carrito en el localStorage', () => {
    const carritoData = [{ id: 1, nombre: 'Zapatillas' }];
    localStorage.setItem('carrito', JSON.stringify(carritoData));
    const recuperado = JSON.parse(localStorage.getItem('carrito'));
    expect(recuperado).toEqual(carritoData);
  });

  it('6. Debe persistir la sesión del usuario en localStorage', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify({ email: 'test@correo.com' }));
    const sesion = JSON.parse(localStorage.getItem('usuarioLogueado'));
    expect(sesion.email).toBe('test@correo.com');
  });

  // --- LOGIN Y AUTENTICACIÓN ---
  it('7. Debe validar exitosamente credenciales correctas de login', () => {
    const esValido = validarLogin('usuario@gmail.com', '123456');
    expect(esValido).toBe(true);
  });

  it('8. Debe rechazar contraseñas con menos de 6 caracteres en el login', () => {
    const esValido = validarLogin('usuario@gmail.com', '1234');
    expect(esValido).toBe(false);
  });

  // --- REGISTRO DE USUARIOS ---
  it('9. Debe registrar un nuevo usuario exitosamente', () => {
    const usuarios = [];
    const nuevo = { email: 'nuevo@correo.com', pass: '123456' };
    const resultado = registrarUsuario(usuarios, nuevo);
    expect(resultado).toHaveLength(1);
  });

  it('10. Debe lanzar un error al intentar registrar un email duplicado', () => {
    const usuarios = [{ email: 'existente@correo.com', pass: '123456' }];
    const duplicado = { email: 'existente@correo.com', pass: '654321' };
    expect(() => registrarUsuario(usuarios, duplicado)).toThrow('El usuario ya existe');
  });

});