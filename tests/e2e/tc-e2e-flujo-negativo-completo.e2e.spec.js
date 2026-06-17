import { test, expect } from '@playwright/test';

const API = process.env.API_URL;

test('E2E - Usuario intenta duplicar su registro y luego falla el login', async ({ request, page }) => {

  // === FASE 1: SETUP con API ===
  const username = `e2e_${Date.now()}`;
  const password = 'bootcamp123';

  const signup = await request.post(`${API}/signup`, {
    data: { username, password }
  });
  expect(signup.status()).toBe(200);
  console.log('Usuario creado por API:', username);

  // === FASE 2: TEST con UI - Intento de registro duplicado ===
  await page.goto('/');
  await expect(page).toHaveTitle(/STORE/);

  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(username);
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);

  const dialogDuplicado = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const errorDuplicado = await dialogDuplicado;

  // === FASE 3: VERIFY - El sistema rechaza el duplicado ===
  console.log('Mensaje signup duplicado:', errorDuplicado.message());
  expect(errorDuplicado.message()).toContain('This user already exist.');
  await errorDuplicado.accept();

  // Cerramos el modal de signup que quedo abierto en el DOM
  await page.locator('#signInModal .btn-secondary').click();
  await expect(page.locator('#signInModal')).not.toBeVisible();

  // === FASE 2 (continua): TEST con UI - Login con password incorrecta ===
  await page.getByRole('link', { name: 'Log in' }).click();
  await expect(page.locator('#logInModal')).toBeVisible();

  await page.locator('#loginusername').fill(username);
  await page.locator('#loginpassword').fill('passwordIncorrecta999');

  const dialogLogin = page.waitForEvent('dialog');
  await page.locator('#logInModal .btn-primary').click();
  const errorLogin = await dialogLogin;

  // === FASE 3 (continua): VERIFY - El sistema rechaza la contrasena incorrecta ===
  console.log('Mensaje login invalido:', errorLogin.message());
  expect(errorLogin.message()).toContain('Wrong password.');
  await errorLogin.accept();

  // Verificacion final: el usuario nunca quedo logueado en ningun punto del flujo
  await expect(page.locator('#nameofuser')).not.toBeVisible();
});