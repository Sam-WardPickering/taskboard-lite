import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { AppShell } from '../../pages/index.js';
import { loginAs } from '../../helpers/auth.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('UI - theme', () => {
    test('theme changes while logged out', async ({ page }) => {
        await gotoApp(page);

        const appShell = new AppShell(page);

        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

        await appShell.toggleTheme();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

        await appShell.toggleTheme();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    });
    test('theme changes while logged in', async ({ page }) => {
        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);
        const appShell = new AppShell(page);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
        
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

        await appShell.toggleTheme();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

        await appShell.toggleTheme();
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
});
