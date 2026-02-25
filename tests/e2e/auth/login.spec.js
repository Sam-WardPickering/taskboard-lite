import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Login validation', () => {
    test('shows error for invalid email format', async ({ page }) => {
        const email = 'invalidemail';
        const password = 'password123';

        await gotoApp(page);
        const login = new LoginPage(page);

        await login.login(email, password);

        await expect(login.signInError).toHaveText('Enter a valid email.');
        await expect(page.getByTestId('app-card')).not.toBeVisible();

        await expect(login.card).toBeVisible();
    });

    test('shows error for incorrect password length', async ({ page }) => {
        const email = 'sam@test.com';
        const password = 'pass1';

        await gotoApp(page);
        const login = new LoginPage(page);

        await login.login(email, password);

        await expect(login.signInError).toHaveText('Password must be at least 6 characters.');
        await expect(page.getByTestId('app-card')).not.toBeVisible();

        await expect(login.card).toBeVisible();
    });

    test('shows error for invalid credentials', async ({ page }) => {
        const email = 'fail@test.com';
        const password = 'password123';

        await gotoApp(page);
        const login = new LoginPage(page);

        await login.login(email, password);

        await expect(login.signInError).toHaveText('Invalid credentials.');
        await expect(page.getByTestId('app-card')).not.toBeVisible();

        await expect(login.card).toBeVisible();
    });
});