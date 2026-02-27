import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage';
import { todayISO } from '../../helpers/date.js';

test.describe('Create', () => {
    test('create a task (happy path)', async ({ page }) => {
        const email = 'sam@test.com';
        const password = 'password123';
        const expectedUser = email.split('@')[0];

        const taskTitle = `Task ${Date.now()}`;
        const taskDue = todayISO();
        const taskPriority = 'high';

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);
        
        await login.login(email, password);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(expectedUser);

        await taskBoard.createTask({
            taskTitle,
            taskDue,
            taskPriority
        });

        await expect(taskBoard.taskItem(taskTitle)).toBeVisible();
    });
});