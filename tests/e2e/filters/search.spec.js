import { test, expect } from '../../fixtures/baseTest.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Search', () => { 
    test('shows matching tasks when searching by title', async ({ authenticatedPage: { taskBoard } }) => {
        const task1 = uniqueTitle('Task One');
        const task2 = uniqueTitle('Task Two');
        
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
    test('shows empty state when no tasks match the search', async ({ authenticatedPage: { taskBoard } }) => {
        const task1 = uniqueTitle('Task One');
        const task2 = uniqueTitle('Task Two');

        await taskBoard.createTask({ title: task1 });
        await expect(taskBoard.taskItem(task1)).toBeVisible();

        await taskBoard.createTask({ title: task2 });
        await expect(taskBoard.taskItem(task2)).toBeVisible();

        await taskBoard.searchTask('does-not-match');

        await expect(taskBoard.taskItem(task1)).toHaveCount(0);
        await expect(taskBoard.taskItem(task2)).toHaveCount(0);
        await expect(taskBoard.emptyState).toBeVisible();
    });
});