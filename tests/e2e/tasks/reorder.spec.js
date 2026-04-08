import { test, expect } from '../../fixtures/baseTest.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Reorder', () => {
    test('task order updates after drag and drop', async ({ authenticatedPage: { taskBoard } }) => {
        const firstTask = uniqueTitle('First Task');
        const secondTask = uniqueTitle('Second Task');
        const thirdTask = uniqueTitle('Third Task');

        await taskBoard.createTask({ title: firstTask });
        await expect(taskBoard.taskItem(firstTask)).toBeVisible();

        await taskBoard.createTask({ title: secondTask });
        await expect(taskBoard.taskItem(secondTask)).toBeVisible();

        await taskBoard.createTask({ title: thirdTask });
        await expect(taskBoard.taskItem(thirdTask)).toBeVisible();
    })
});