import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Kịch bản kiểm thử trang Đăng nhập', () => {

  test('Kiểm tra đăng nhập thành công', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Tài khoản chuẩn của trang demo Herokuapp
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.verifyErrorMessage('You logged into a secure area!');
  });

  test('Kiểm tra đăng nhập thất bại với sai mật khẩu', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'WrongPassword');
    await loginPage.verifyErrorMessage('Your password is invalid!');
  });

});