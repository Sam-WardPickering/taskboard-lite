import { expect } from '../fixtures/baseTest.js';

/**
 * Navigate to the app root and wait for initial loading to settle.
 * @param {import('@playwright/test').Page} page
 */
export async function gotoApp(page) {
    await page.goto('/');

    // App spinner uses data-testid="loading"
    const spinner = page.getByTestId('loading');

    // Only wait if it appears; avoid strict dependency on spinner always existing.
    if (await spinner.isVisible().catch(() => false)) {
        await expect(spinner).toBeHidden();
    }

};