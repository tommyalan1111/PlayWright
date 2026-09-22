import { Page, Locator } from '@playwright/test';

export class MoonstakeLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly skip2faButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Account Password' });
    this.submitButton = page.getByRole('button', { name: 'Sign in', exact: true });
    this.skip2faButton = page.getByRole('button', { name: 'SKIP FOR NOW' });
  }

  async goto() {
    await this.page.goto('https://wallet.moonstake.io/sign-in', { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, pass: string) {
    // 1. Điền Email & Mật khẩu
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);

    // 2. TẠM DỪNG: Bảng điều khiển Playwright Inspector sẽ mở ra.
    // Bạn dùng chuột tích vào ô Cloudflare Turnstile trên cửa sổ trình duyệt.
    // Sau khi xuất hiện dấu tích xanh, bấm nút "Resume" (nút Play màu xanh) trên thanh công cụ Playwright Inspector.
    console.log('⏸️ Đã tạm dừng. Vui lòng tick thủ công Cloudflare rồi bấm Resume trên Playwright Inspector...');
    await this.page.pause();

    // 3. Tiếp tục tự động click nút Sign In
    await this.submitButton.click();

    // 4. Bấm SKIP FOR NOW nếu xuất hiện popup 2FA
    try {
      await this.skip2faButton.waitFor({ state: 'visible', timeout: 8000 });
      await this.skip2faButton.click();
    } catch (e) {
      console.log('Không xuất hiện popup 2FA.');
    }
  }
}