import { test, expect } from '@playwright/test';

test.describe('TC05 - Navegación a URL inválida maneja error UI', () => {
  test('UI: acceder a una URL inexistente muestra mensaje de error', async ({
    page,
  }) => {
    await page.goto('/aaaa');

    await expect(page.locator('body')).toContainText('Not Found');
  });
});
