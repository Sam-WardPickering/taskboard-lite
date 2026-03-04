import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage';

test.describe.only('Tasks - Edit', () => {
    const email = 'sam@test.com';
    const password = 'password123';
    const expectedUser = email.split('@')[0];

    test('edit a task title (happy path)', async ({ page }) => {
        const id = Date.now();
        const title = `Task 1 - Created - ${id}`;
        const newTitle = `Task 1 - Edited - ${id}`;
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

        await taskBoard.editTask(title, { title: newTitle });

        await expect(taskBoard.editForm()).not.toBeVisible();
        await expect(taskBoard.taskItem(title)).toHaveCount(0);
        await expect(taskBoard.taskItem(newTitle)).toBeVisible();

    });
});