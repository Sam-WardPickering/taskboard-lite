/**
 * Navigate to the app root and wait for initial loading to settle.
 * @param {import('@playwright/test').Page} page
 */
export async function gotoApp(page) {
    await page.goto('/');
    await page.getByTestId('loading').waitFor({ state: 'hidden', timeout: 5000 });
};