import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { settings } from "../config/env";

export class ApiClient {
  private context?: APIRequestContext;

  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: settings.apiBaseUrl,
      extraHTTPHeaders: settings.apiToken
        ? {
            Authorization: `Bearer ${settings.apiToken}`,
          }
        : undefined,
    });
  }

  async dispose(): Promise<void> {
    await this.context?.dispose();
  }

  private getContext(): APIRequestContext {
    if (!this.context) {
      throw new Error("ApiClient not initialized. Call init() first.");
    }
    return this.context;
  }

  async get(path: string): Promise<APIResponse> {
    return this.getContext().get(path);
  }

  async post(path: string, data: unknown): Promise<APIResponse> {
    return this.getContext().post(path, { data });
  }

  async put(path: string, data: unknown): Promise<APIResponse> {
    return this.getContext().put(path, { data });
  }

  async delete(path: string): Promise<APIResponse> {
    return this.getContext().delete(path);
  }
}
