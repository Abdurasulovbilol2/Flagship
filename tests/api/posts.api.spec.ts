import { expect, test } from "@playwright/test";
import { ApiClient } from "../../src/api/ApiClient";

test.describe("API - Posts CRUD", () => {
  let client: ApiClient;

  test.beforeEach(async () => {
    client = new ApiClient();
    await client.init();
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test("GET /posts/1 returns post data @smoke", async () => {
    const response = await client.get("/posts/1");
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty("id", 1);
  });

  test("POST /posts creates a record", async () => {
    const response = await client.post("/posts", {
      title: "flagship-framework",
      body: "api test",
      userId: 1,
    });
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body).toHaveProperty("title", "flagship-framework");
  });

  test("PUT /posts/1 updates a record", async () => {
    const response = await client.put("/posts/1", {
      id: 1,
      title: "updated-title",
      body: "updated-body",
      userId: 1,
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty("title", "updated-title");
  });

  test("DELETE /posts/1 returns success", async () => {
    const response = await client.delete("/posts/1");
    expect([200, 204]).toContain(response.status());
  });

  test("GET unknown resource returns 404", async () => {
    const response = await client.get("/posts/999999");
    expect(response.status()).toBe(404);
  });
});
