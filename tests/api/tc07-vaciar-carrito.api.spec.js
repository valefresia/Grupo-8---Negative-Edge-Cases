import { test, expect } from '@playwright/test';

const API = process.env.API_URL;

test.describe('TC07 - Vaciar carrito ya vacio', () => {

  test('API: vaciar un carrito ya vacio responde sin error', async ({ request }) => {

    const username = `tc07_user_${Date.now()}`;
    const password = 'bootcamp123';

    // Creamos un usuario nuevo (su carrito nace vacio)
    await request.post(`${API}/signup`, {
      data: { username, password }
    });

    // Intentamos vaciar el carrito sin haber agregado nada
    const response = await request.post(`${API}/deletecart`, {
      data: { cookie: username }
    });

    // Verificacion temporal - ver respuesta cruda antes de asumir
    const body = await response.text();
    console.log('Respuesta vaciar carrito vacio:', body);
    console.log('Status code:', response.status());

    // El sistema no debe explotar: esperamos status 200
    expect(response.status()).toBe(200);
  });

});