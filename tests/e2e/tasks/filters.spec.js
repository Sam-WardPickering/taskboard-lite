import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data/users.js';
import { uniqueTitle } from '../../helpers/id.js';

const user = testUsers.sam;

test.describe('Task - Filters', () => {
    test.only('active filter', async ({ page }) => {
        const taskActive = uniqueTitle('Task Active');
        const taskCompleted = uniqueTitle('Task Completed');

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(user.email, user.password);
        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: taskActive });
        await expect(taskBoard.taskItem(taskActive)).toBeVisible();

        await taskBoard.createTask({ title: taskCompleted });
        await expect(taskBoard.taskItem(taskCompleted)).toBeVisible();

        await taskBoard.toggleTask(taskCompleted);
        
        await expect(taskBoard.taskCheckbox(taskActive)).not.toBeChecked();
        await expect(taskBoard.taskCheckbox(taskCompleted)).toBeChecked();
        
        // mark one completed
        // navigate to active
        // confirm one is there

    });
    // test('completed filter', async ({ page }) => {

    // });
});