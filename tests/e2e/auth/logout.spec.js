import { test, expect } from '../../fixtures/baseTest';
import { gotoApp } from '../../helpers/navigation';
import { LoginPage } from '../../pages/LoginPage';
import { TaskBoardPage } from '../../pages/TaskBoardPage';

test.describe('Logout validation', () => {
    test('user is correctrly logged out', async ({ page }) => {
        const email = 'sam@test.com';
        const password = 'password123';

        await gotoApp(page);

        const login = new LoginPage(page);
        await login.login(email, password);

        const taskBoard = new TaskBoardPage(page);

        await expect(taskBoard.card).toBeVisible();

        await taskBoard.logout();

        await expect(login.card).toBeVisible();
        await expect(taskBoard.card).not.toBeVisible();

        await page.reload();

        await expect(login.card).toBeVisible();
        await expect(taskBoard.card).not.toBeVisible();
    });
});
