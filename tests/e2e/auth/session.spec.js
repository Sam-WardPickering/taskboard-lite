import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Session', () => {
    test('stays logged in after reload', async ({ page }) => {

        await gotoApp(page);
        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(user.email, user.password);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
    });
});