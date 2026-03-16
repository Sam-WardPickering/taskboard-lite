import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { testUsers } from '../../test-data/users.js';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Session', () => {
    test('stays logged in after reload', async ({ page }) => {

        await gotoApp(page);
      
        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
    });
});