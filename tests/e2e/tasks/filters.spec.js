import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data/users.js';
import { uniqueTitle } from '../../helpers/id.js';

const user = testUsers.sam;

test.describe('Tasks - Filters', () => {
    test('shows only active tasks when Active filter is selected', async ({ page }) => {
        const taskActive = uniqueTitle('Task Active');
        const taskCompleted = uniqueTitle('Task Completed');

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(user.email, user.password);
        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        // Assert initial filter state
        await expect(taskBoard.showAllButton).toContainClass('is-active');

        await taskBoard.createTask({ title: taskActive });
        await expect(taskBoard.taskItem(taskActive)).toBeVisible();

        await taskBoard.createTask({ title: taskCompleted });
        await expect(taskBoard.taskItem(taskCompleted)).toBeVisible();

        await taskBoard.toggleTask(taskCompleted);
        
        await expect(taskBoard.taskCheckbox(taskActive)).not.toBeChecked();
        await expect(taskBoard.taskCheckbox(taskCompleted)).toBeChecked();
        
        await taskBoard.showActive();
        await expect(taskBoard.showActiveButton).toContainClass('is-active');

        await expect(taskBoard.taskItem(taskActive)).toBeVisible();
        await expect(taskBoard.taskItem(taskCompleted)).toHaveCount(0);

    });
    test('shows only completed tasks when Completed filter is selected', async ({ page }) => {
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

        await expect(taskBoard.taskCheckbox(taskCompleted)).toBeChecked();
        await expect(taskBoard.taskCheckbox(taskActive)).not.toBeChecked();

        await taskBoard.showCompleted();
        await expect(taskBoard.showCompletedButton).toContainClass('is-active');

        await expect(taskBoard.taskItem(taskCompleted)).toBeVisible();
        await expect(taskBoard.taskItem(taskActive)).toHaveCount(0);

        // Verify return to default all state
        await taskBoard.showAll();
        await expect(taskBoard.showAllButton).toContainClass('is-active');

        await expect(taskBoard.taskItem(taskActive)).toBeVisible();
        await expect(taskBoard.taskItem(taskCompleted)).toBeVisible();
        
    });
});