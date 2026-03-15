import { test, expect } from '../../fixtures/baseTest';
import { gotoApp } from '../../helpers/navigation';
import { LoginPage } from '../../pages/LoginPage';
import { testUsers } from '../../test-data/users';

const user = testUsers.sam;

test.describe('Session', () => {
    test('stays logged in after reload', async ({ page }) => {

        await gotoApp(page);
        const login = new LoginPage(page);

        await login.login(user.email, user.password);

        await expect(page.getByTestId('app-card')).toBeVisible();
        await expect(page.getByTestId('user-name')).toHaveText(user.expectedUser);

        await page.reload();

        await expect(page.getByTestId('app-card')).toBeVisible();
        await expect(page.getByTestId('user-name')).toHaveText(user.expectedUser);
    });
});