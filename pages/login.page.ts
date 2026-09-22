import { Page, Locator, expect } from '@playwright/test';

export class MoonstakeLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly skip2faButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Email').or(page.locator('input[type="email"]'));
    this.passwordInput = page.getByPlaceholder('Account Password').or(page.locator('input[type="password"]'));
    this.submitButton = page.getByRole('button', { name: /Sign In/i }).or(page.locator('button[type="submit"]'));
    
    // Định vị nút SKIP FOR NOW trên popup 2FA
    this.skip2faButton = page.getByRole('button', { name: 'SKIP FOR NOW' }).or(page.locator('button:has-text("SKIP FOR NOW")'));
  }

  async goto() {
    await this.page.goto('https://wallet.moonstake.io/sign-in');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);

    // Bấm nút Sign In
    await this.submitButton.click();

    // Chờ popup 2FA xuất hiện và bấm SKIP FOR NOW
    await this.skip2faButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.skip2faButton.click();
  }
}