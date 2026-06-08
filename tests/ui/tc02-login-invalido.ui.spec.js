import { test, expect } from '@playwright/test';

const API = process.env.API_URL;

test.describe('TC02 - Login con credenciales incorrectas UI', () => {

  test('UI: login con password incorrecta muestra alerta', async ({ request, page }) => {

    const username = `tc02_ui_${Date.now()}`;
    const passwordCorrecta = 'bootcamp123';
    const passwordIncorrecta = 'contraseniaWrong999';

    // Setup por API
    await request.post(`${API}/signup`, {
      data: { username, password: passwordCorrecta }
    });

    await page.goto('/');

    // Abrimos el modal de login y esperamos que sea visible
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.locator('#logInModal')).toBeVisible();

    // Apuntamos los inputs dentro del modal especifico
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(passwordIncorrecta);

    // Capturamos el dialog ANTES de clickear
    const dialogPromise = page.waitForEvent('dialog');
    await page.locator('#logInModal .btn-primary').click();
    const dialog = await dialogPromise;

    console.log('Mensaje del alert:', dialog.message());
    expect(dialog.message()).toContain('Wrong password.');
    await dialog.accept();

    // Verificamos que NO quedo logueado
    await expect(page.locator('#nameofuser')).not.toBeVisible();
  });

});