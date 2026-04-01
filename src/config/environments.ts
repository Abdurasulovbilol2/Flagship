export type Environment = "dev" | "staging" | "prod";

export interface EnvironmentConfig {
  uiBaseUrl: string;
  apiBaseUrl: string;
}

export function getEnvironments(): Record<Environment, EnvironmentConfig> {
  return {
    dev: {
      uiBaseUrl: process.env.UI_BASE_URL_DEV || "https://www.saucedemo.com",
      apiBaseUrl:
        process.env.API_BASE_URL_DEV || "https://jsonplaceholder.typicode.com",
    },
    staging: {
      uiBaseUrl: process.env.UI_BASE_URL_STAGING || "https://www.saucedemo.com",
      apiBaseUrl:
        process.env.API_BASE_URL_STAGING ||
        "https://jsonplaceholder.typicode.com",
    },
    prod: {
      uiBaseUrl: process.env.UI_BASE_URL_PROD || "https://www.saucedemo.com",
      apiBaseUrl:
        process.env.API_BASE_URL_PROD || "https://jsonplaceholder.typicode.com",
    },
  };
}
