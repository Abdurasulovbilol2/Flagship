import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryContainer: Locator;
  private readonly cartLink: Locator;
  private readonly checkoutButton: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly checkoutError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator(".inventory_container");
    this.cartLink = page.locator(".shopping_cart_link");
    this.checkoutButton = page.locator("#checkout");
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.postalCode = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.checkoutError = page.locator("[data-test='error']");
  }

  async expectOnInventoryPage(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addBackpackToCart(): Promise<void> {
    await this.page.locator("#add-to-cart-sauce-labs-backpack").click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async expectCheckoutValidationError(partialMessage: string): Promise<void> {
    await expect(this.checkoutError).toContainText(partialMessage);
  }
}
