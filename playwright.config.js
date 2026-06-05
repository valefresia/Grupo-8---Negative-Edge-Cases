// @ts-check
const { defineConfig, devices } = require('@playwright/test');
try {
  require('dotenv').config();
} catch (e) {
  // dotenv is optional; continue without it if not installed
}

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