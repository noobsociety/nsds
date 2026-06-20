import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:6107',
    colorScheme: 'dark',
    viewport: {
      width: 1280,
      height: 900,
    },
  },
  webServer: {
    command: 'node scripts/serve-static.mjs . 6107',
    reuseExistingServer: !process.env.CI,
    url: 'http://127.0.0.1:6107/site/index.html',
  },
});
