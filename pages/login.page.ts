import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Định vị chính xác các phần tử trên trang demo Herokuapp
    this.usernameInput = page.locator('#username'); 
    this.passwordInput = page.locator('#password'); 
    this.loginButton = page.locator('button[type="submit"]'); 
    this.errorMessage = page.locator('#flash'); 
  }

  /** Điều hướng tới trang đăng nhập demo chuẩn */
  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  /** Thao tác điền thông tin và bấm nút đăng nhập */
  async login(username: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  /** Kiểm tra xem thông báo lỗi/thành công có chứa text mong muốn hay không */
  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toContainText(expectedText);
  }
}