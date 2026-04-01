import dotenv from "dotenv";
import { Environment, getEnvironments } from "./environments";

dotenv.config();

const environments = getEnvironments();

const testEnv = (process.env.TEST_ENV as Environment) || "dev";
const config = environments[testEnv] || environments.dev;

const parseBoolean = (
  value: string | undefined,
  fallback: boolean,
): boolean => {
  if (value === undefined) {
    return fallback;
  }
  return value.toLowerCase() === "true";
};

export const settings = {
  testEnv,
  uiBaseUrl: config.uiBaseUrl,
  apiBaseUrl: config.apiBaseUrl,
  apiToken: process.env.API_TOKEN || "",
  headless: parseBoolean(process.env.HEADLESS, true),
  retries: Number(process.env.RETRIES ?? (process.env.CI ? 2 : 1)),
  workers: process.env.WORKERS || "50%",
};
