import { test, expect } from '@playwright/test';

test('TC06.1 - Alert visible al realizar acción no permitida - Intentar registrarse con usuario y sin contraseña', async ({
  page,
}) => {
  await page.goto('/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill('usuario');

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const dialog = await dialogPromise;
  expect(dialog.message()).toBe('Please fill out Username and Password.');
  await page.getByRole('button', { name: 'Sign up' }).click();
});

test('TC06.2 - Alert visible al realizar acción no permitida - Intentar registrarse con contraseña y sin usuario', async ({
  page,
}) => {
  await page.goto('/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('contrasena');

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const dialog = await dialogPromise;
  expect(dialog.message()).toBe('Please fill out Username and Password.');
  await page.getByRole('button', { name: 'Sign up' }).click();
});

test('TC06.3 - Alert visible al realizar acción no permitida - Intentar registrarse sin contraseña y sin usuario', async ({
  page,
}) => {
  await page.goto('/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill('');

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const dialog = await dialogPromise;
  expect(dialog.message()).toBe('Please fill out Username and Password.');
  await page.getByRole('button', { name: 'Sign up' }).click();
});
