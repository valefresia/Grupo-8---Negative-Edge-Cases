import { test, expect } from '@playwright/test';

test.describe('TC05 - Navegación a URL inválida maneja error UI', () => {
  test('UI: acceder a una URL inexistente muestra mensaje de error', async ({
    page,
  }) => {
    // Usamos la URL completa porque la relativa falla sin baseURL activo
    await page.goto('https://www.demoblaze.com/paginaquenova', {
      waitUntil: 'commit',
    });

    // Esperamos que el body tenga contenido
    await expect(page.locator('body')).not.toBeEmpty();

    // Verificamos que muestra el mensaje de errornpx
    await expect(page.locator('body')).toContainText('Not Found');
  });
});
