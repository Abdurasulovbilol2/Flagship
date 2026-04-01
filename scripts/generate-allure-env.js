const fs = require("fs");
const path = require("path");

const outputDir = path.resolve(process.cwd(), "allure-results");
const outputFile = path.join(outputDir, "environment.properties");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const lines = [
  `TEST_ENV=${process.env.TEST_ENV || "dev"}`,
  `CI=${process.env.CI || "false"}`,
  `HEADLESS=${process.env.HEADLESS || "true"}`,
  `WORKERS=${process.env.WORKERS || "50%"}`,
  `TIMESTAMP=${new Date().toISOString()}`,
];

fs.writeFileSync(outputFile, lines.join("\n"), "utf-8");
