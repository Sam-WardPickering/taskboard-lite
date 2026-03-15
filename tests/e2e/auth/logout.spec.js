import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Logout', () => {
    test('user is correctly logged out', async ({ page }) => {

        await gotoApp(page);

        const login = new LoginPage(page);
        await login.login(user.email, user.password);

        const taskBoard = new TaskBoardPage(page);

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
