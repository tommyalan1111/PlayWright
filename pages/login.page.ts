import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // 1. Khai báo các thuộc tính đại diện cho trang và các phần tử (elements)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // 2. Hàm khởi tạo (Constructor) - Đăng ký các Locator
  constructor(page: Page) {
    this.page = page;
    // Sử dụng locator để định vị các phần tử trên trang đăng nhập
    this.usernameInput = page.locator('#username'); // Định vị ô nhập username bằng ID
    this.passwordInput = page.locator('#password'); // Định vị ô nhập password bằng ID
    this.loginButton = page.getByRole('button', { name: 'Sign in' }); // Định vị nút Sign in
    this.errorMessage = page.locator('.error-message'); // Định vị thông báo lỗi
  }

  // 3. Viết các phương thức (Methods) thao tác trên trang

  /** Điều hướng trực tiếp tới trang đăng nhập */
  async goto() {
    await this.page.goto('https://example.com/login');
  }

  /** Thao tác điền thông tin và bấm nút đăng nhập */
  async login(username: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  /** Kiểm tra xem thông báo lỗi có hiển thị đúng text hay không */
  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}