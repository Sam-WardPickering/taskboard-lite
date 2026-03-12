import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Task - Filters', () => {
    // test('active filter', async ({ page }) => {
    //     const taskActive = 'Task Active';
    //     const taskCompleted = 'Task Completed';

    //     await gotoApp(page);

    //     const login = new LoginPage(page);
    //     const taskBoard = new TaskBoardPage(page);

    //     await login.login(user.email, user.password);
    //     await expect(taskBoard.card).toBeVisible();
    //     await expect(taskBoard.userName).toHaveText(user.expectedUser);

    //     await taskBoard.createTask({ taskActive });
    //     await taskBoard.createTask({ taskCompleted });






    //     // create 2 tasks
    //     // mark one completed
    //     // navigate to active
    //     // confirm one is there

    // });
    // test('completed filter', async ({ page }) => {

    // });
});