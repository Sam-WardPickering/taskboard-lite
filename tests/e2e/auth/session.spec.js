import { test, expect } from '../../fixtures/baseTest';
import { gotoApp } from '../../helpers/navigation';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Session', () => {
    test('stays logged in after reload', async ({ page }) => {
        const email = 'sam@test.com';
        const password = 'password123';
        const expectedUsername = email.split('@')[0];

        await gotoApp(page);
        login = new LoginPage(page);

        login.login(email, password);

        await expect(page.getByTestId('app-card')).toBeVisible();
        await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);

        await page.reload();

        await expect(page.getByTestId('app-card')).toBeVisible();
        await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
    });
});