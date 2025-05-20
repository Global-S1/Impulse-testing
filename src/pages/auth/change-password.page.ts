import { Page, Locator } from '@playwright/test';

export class ChangePasswordPage {
  readonly page: Page;
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly beginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentPasswordInput = page.locator('input[name="password"]');
    this.newPasswordInput = page.locator('input[name="newpasswordone"]');
    this.confirmPasswordInput = page.locator('input[name="newpasswordtwo"]');
    this.beginButton =  page.locator('.Change_btn__5nLez');
  }

  async changePassword(currentPassword: string, newPassword: string) {
    await this.currentPasswordInput.fill(currentPassword);
    await this.newPasswordInput.fill(newPassword);
    await this.confirmPasswordInput.fill(newPassword);
    console.log(`Nueva contraseña: ${newPassword}`)
    await this.beginButton.click();
  }
}