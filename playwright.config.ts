import { defineConfig } from "@playwright/test";
import { settings } from "./src/config/env";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: settings.retries,
  workers: process.env.CI ? 2 : settings.workers,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: {
    baseURL: settings.uiBaseUrl,
    headless: settings.headless,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
      testIgnore: /.*\.api\.spec\.ts/,
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
      testIgnore: /.*\.api\.spec\.ts/,
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
      testIgnore: /.*\.api\.spec\.ts/,
    },
    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts/,
    },
  ],
  outputDir: "test-results/artifacts",
});
