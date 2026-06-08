import { test, expect } from '@playwright/test';

test.describe('TC04 - Compra incompleta sin producto en carrito UI', () => {
  test('UI: intentar comprar sin productos en el carrito', async ({ page }) => {
    await page.goto('/');

    // Ir al carrito vacío
    await page.getByRole('link', { name: 'Cart' }).click();

    // Verificar que no haya productos en el carrito
    await expect(page.locator('#tbodyid tr')).toHaveCount(0);

    // Abrir modal de compra
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Intentar comprar sin productos
    await page.getByRole('button', { name: 'Purchase' }).click();

    // Validar comportamiento
    await expect(page.locator('.sweet-alert')).not.toBeVisible();
  });
});
