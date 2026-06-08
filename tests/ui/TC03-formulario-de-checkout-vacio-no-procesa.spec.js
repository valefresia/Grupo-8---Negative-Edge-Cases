import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //Con usuario logueado, ingresar al carrito y clickear en Place Order sin completar el formulario, verificar que no se procesa la compra y se muestra un mensaje de error
  await page.goto('https://demoblaze.com/index.html');

  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('button', { name: 'Purchase' }).click();
});
