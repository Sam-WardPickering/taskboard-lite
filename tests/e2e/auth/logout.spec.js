import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';

test.describe('Logout', () => {
    test('user is correctly logged out', async ({ page }) => {
        const email = 'sam@test.com';
        const password = 'password123';
        const expectedUsername = email.split('@')[0];

        await gotoApp(page);

        const login = new LoginPage(page);
        await login.login(email, password);

        const taskBoard = new TaskBoardPage(page);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(expectedUsername);

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
