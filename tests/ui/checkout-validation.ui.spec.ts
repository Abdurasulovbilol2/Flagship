import { test } from "@playwright/test";
import { loadCsvData } from "../../src/core/dataLoader";
import { InventoryPage } from "../../src/pages/InventoryPage";
import { LoginPage } from "../../src/pages/LoginPage";

type CheckoutRow = {
  firstName: string;
  lastName: string;
  postalCode: string;
  expectedError: string;
};

const rows = loadCsvData<CheckoutRow>("tests/data/checkout-data.csv");

test.describe("UI - Checkout Form Validation", () => {
  for (const row of rows) {
    test(`checkout validation: ${row.expectedError}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login("standard_user", "secret_sauce");
      await inventoryPage.addBackpackToCart();
      await inventoryPage.openCart();
      await inventoryPage.startCheckout();

      await inventoryPage.fillCheckoutInfo(
        row.firstName,
        row.lastName,
        row.postalCode,
      );
      await inventoryPage.expectCheckoutValidationError(row.expectedError);
    });
  }
});
