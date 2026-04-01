import { expect, test } from "@playwright/test";
import { loadJsonData } from "../../src/core/dataLoader";
import { InventoryPage } from "../../src/pages/InventoryPage";
import { LoginPage } from "../../src/pages/LoginPage";

type LoginData = {
  name: string;
  username: string;
  password: string;
  isValid: boolean;
};

const users = loadJsonData<LoginData[]>("tests/data/users.json");

test.describe("UI - Login", () => {
  for (const user of users) {
    test(`login scenario: ${user.name} @smoke`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.isValid) {
        await inventoryPage.expectOnInventoryPage();
      } else {
        await loginPage.expectLoginError("Username and password do not match");
      }
    });
  }

  test("successful login lands on inventory page @smoke", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await inventoryPage.expectOnInventoryPage();
    await expect(page).toHaveURL(/inventory/);
  });
});
