import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { AppShell } from '../../pages/AppShell.js';

test.describe('UI - theme', () => {
    test.only('theme changes while logged out', async ({ page }) => {
        await gotoApp(page);

        const appShell = new AppShell(page);

        expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

        await appShell.toggleTheme();

        expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    });
    test('theme changes while logged in', async ({ page }) => {

    });
});
