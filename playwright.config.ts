import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // Tăng timeout cho toàn bộ test case
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    // Bỏ cờ AutomationControlled để ẩn dấu vết Playwright
    launchOptions: {
      args: ['--disable-blink-features=AutomationControlled'],
    },
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome', // Chỉ định dùng Google Chrome thật cài trên OS
      },
    },
  ],
});