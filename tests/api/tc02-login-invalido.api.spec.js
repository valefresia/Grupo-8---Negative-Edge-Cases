import { test, expect } from '@playwright/test';

const API = process.env.API_URL;

test.describe('TC02 - Login con credenciales incorrectas', () => {

  test('API: login con password incorrecta retorna error', async ({ request }) => {

    const username = `tc02_user_${Date.now()}`;
    const passwordCorrecta = 'bootcamp123';
    const passwordIncorrecta = 'contraseniaWrong999';

    await request.post(`${API}/signup`, {
      data: { username, password: passwordCorrecta }
    });

    const response = await request.post(`${API}/login`, {
      data: { username, password: passwordIncorrecta }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Respuesta login invalido:', body);

    expect(body).toHaveProperty('errorMessage');
    expect(body.errorMessage).toContain('Wrong password.');
  });

});