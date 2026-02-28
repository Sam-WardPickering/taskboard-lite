import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage';
import { todayISO } from '../../helpers/date';

test.describe('Delete', () => {
    const email = 'sam@test.com';
    const password = 'password123';
    const expectedUser = email.split('@')[0];

    test('task can be deleted (happy path)', async ({ page }) => {
        const title = `Task ${Date.now()}`;
        const due = todayISO();
        const priority = 'high';

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await gotoApp(page);

        login.login(email, password);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.deleteTask(title);

        await expect(taskBoard.taskItem(title)).not.toBeVisible();
    });
});