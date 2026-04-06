import { defineConfig, devices } from "@playwright/test";

const devPort = 5173;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${devPort}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- --port ${devPort}`,
    url: `http://localhost:${devPort}`,
    reuseExistingServer: !process.env.CI,
    env: {
      ...process.env,
      VITE_WHATSAPP_NUMBER: "5511999887766",
    },
  },
});
