import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';

test('loads login screen', async ({ page }) => {
    await gotoApp(page);

    await expect(page.getByTestId('login-card')).toBeVisible();
});


test('can login (happy path)', async ({ page }) => {
    const email = 'sam@test.com';
    const password = 'password123';
    const expectedUsername = email.split('@')[0];

    await gotoApp(page);

    const login = new LoginPage(page);
    await expect(login.card).toBeVisible();

    await login.login(email, password);

    // Dashboard visible.
    await expect(page.getByTestId('app-card')).toBeVisible();

    // Username visible and correct.
    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
});