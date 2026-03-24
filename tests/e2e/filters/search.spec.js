import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { testUsers } from '../../test-data/users.js';
import { loginAs } from '../../helpers/auth.js';
import { uniqueTitle } from '../../helpers/id.js';

const user = testUsers.sam;

test.describe('Tasks - Search', () => { 
    test('shows matching tasks when searching by title', async ({ page }) => {
        const task1 = uniqueTitle('Task One');
        const task2 = uniqueTitle('Task Two');
        
        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: task1 });
        await expect(taskBoard.taskItem(task1)).toBeVisible();

        await taskBoard.createTask({ title: task2 });
        await expect(taskBoard.taskItem(task2)).toBeVisible();

        // Search Task 1
        await taskBoard.searchTask('One');

        await expect(taskBoard.taskItem(task1)).toBeVisible();
        await expect(taskBoard.taskItem(task2)).toHaveCount(0);

        // Search Task 2
        await taskBoard.searchTask(task2);

        await expect(taskBoard.taskItem(task2)).toBeVisible();
        await expect(taskBoard.taskItem(task1)).toHaveCount(0);

        // Clear search
        await taskBoard.searchTask('');

        await expect(taskBoard.taskItem(task1)).toBeVisible();
        await expect(taskBoard.taskItem(task2)).toBeVisible();
    });
    test.only('shows empty state when no tasks match the search', async ({ page }) => {
        const task1 = uniqueTitle('Task One');
        const task2 = uniqueTitle('Task Two');

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: task1 });
        await expect(taskBoard.taskItem(task1)).toBeVisible();

        await taskBoard.createTask({ title: task2 });
        await expect(taskBoard.taskItem(task2)).toBeVisible();

        await taskBoard.searchTask('asdf');

        await expect(taskBoard.taskItem(task1)).toHaveCount(0);
        await expect(taskBoard.taskItem(task2)).toHaveCount(0);
        await expect(taskBoard.emptyState).toBeVisible();
    })
});