import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';

test('loads login screen', async ({ page }) => {
    await gotoApp(page);

    await expect(page.getByTestId('login-card')).toBeVisible();
});