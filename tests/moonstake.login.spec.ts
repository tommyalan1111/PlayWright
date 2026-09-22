import { test, expect, chromium } from '@playwright/test';
import { MoonstakeLoginPage } from '../pages/moonstake.login.page';

test.describe('Moonstake Wallet - Kịch bản đăng nhập qua Remote Chrome', () => {

  // Không dùng fixture { page } ở tham số truyền vào
  test('Đăng nhập vượt Cloudflare bằng Remote Debugging', async () => {
    test.setTimeout(120000); // Cho phép chờ thao tác tay 2 phút

    // 1. Kết nối trực tiếp vào cửa sổ Chrome thật ở port 9222
    const browser = await chromium.connectOverCDP('http://localhost:9222');
    const defaultContext = browser.contexts()[0];
    
    // Lấy tab đang mở hoặc tạo tab mới trên chính cửa sổ Chrome đó
    const page = defaultContext.pages()[0] || await defaultContext.newPage();

    const loginPage = new MoonstakeLoginPage(page);

    // 2. Điều hướng tới trang đăng nhập
    await loginPage.goto();

    // 3. Điền email và password
    await loginPage.emailInput.fill('phucvh@blockchainlabs.asia');
    await loginPage.passwordInput.fill('PhucVyKen.0608');

    // 4. Tạm dừng để bạn tick Cloudflare thủ công trên cửa sổ Chrome thật
    console.log('⏸️ Vui lòng tick vào ô Cloudflare trên cửa sổ Chrome thật...');
    await page.pause();

    // 5. Bấm nút Sign In sau khi có tích xanh
    await loginPage.submitButton.click();

    // 6. Xử lý popup 2FA nếu có
    try {
      await loginPage.skip2faButton.waitFor({ state: 'visible', timeout: 8000 });
      await loginPage.skip2faButton.click();
    } catch (e) {
      console.log('Không có popup 2FA');
    }

    // 7. Kiểm tra đã chuyển hướng thành công
    await expect(page).not.toHaveURL(/.*sign-in/, { timeout: 15000 });
  });

});
