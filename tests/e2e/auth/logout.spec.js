import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { testUsers } from '../../test-data/users.js';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Logout', () => {
    test('user is correctly logged out', async ({ page }) => {

        await gotoApp(page);

        const { login, taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.logout();

        await expect(login.card).toBeVisible();
        await expect(taskBoard.card).not.toBeVisible();
        await expect(taskBoard.userName).not.toBeVisible();

        await page.reload();

        await expect(login.card).toBeVisible();
        await expect(taskBoard.card).not.toBeVisible();
        await expect(taskBoard.userName).not.toBeVisible();
    });
});
