// @ts-check
const { defineConfig, devices } = require('@playwright/test');
<<<<<<< HEAD
/**
 * Configuracion de Playwright para el proyecto final.
 * Documentacion: https://playwright.dev/docs/test-configuration
 */
=======
try {
  require('dotenv').config();
} catch (e) {
  // dotenv is optional; continue without it if not installed
}

>>>>>>> 8cee6db940c2af9a7e8fc69a820460b2f69dee76
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: true,
  retries: 0,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});