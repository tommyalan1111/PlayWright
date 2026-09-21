import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Kịch bản kiểm thử trang Đăng nhập', () => {

  test('Kiểm tra đăng nhập với thông tin giả lập', async ({ page }) => {
    // 1. Khởi tạo đối tượng LoginPage từ class đã định nghĩa ở folder pages
    const loginPage = new LoginPage(page);

    // 2. Mở trang đăng nhập
    await loginPage.goto();

    // 3. Thực hiện hành động đăng nhập
    await loginPage.login('testuser', 'Password123');

    // 4. (Tùy chọn) Kiểm tra thông báo lỗi nếu trang demo trả về lỗi
    // await loginPage.verifyErrorMessage('Invalid username or password.');
  });

});