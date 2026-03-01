import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp, goToApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';

test.describe('Task - Complete', () => {
    const email = 'sam@test.com';
    const password = 'password123';
    const expectedUser = email.split('@')[0];

    test.only('complete a task (happy path)', async ({ page }) => {
        const title = `Task ${Date.now()}`;
        const due = todayISO();
        const priority = 'high';

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(email, password);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        // Complete task
        await taskBoard.toggleTask(title);

        expect(taskBoard.isTaskCompleted()).toBe(true);

        // Undo completion
        await taskBoard.toggleTask(title);

        expect(taskBoard.isTaskCompleted(title)).toBe(false);

    });
});