import { test, expect } from '../../fixtures/baseTest';
import { gotoApp } from '../../helpers/navigation';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login validation', () => {
    test('shows error for invalid email format', async ({ page }) => {
        const email = 'invalidemail';
        const password = 'password123';

        await gotoApp(page);
        const login = new LoginPage(page);

        await login.login(email, password);

        await expect(login.signInError).toHaveText('Enter a valid email.');
        await expect(page.getByTestId('app-card')).not.toBeVisible();
    })
});