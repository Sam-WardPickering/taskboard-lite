import { test, expect } from '../../fixtures/baseTest.js';
import { todayISO } from '../../helpers/date.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Delete', () => {
    test('task can be deleted (happy path)', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.deleteTask(title);

        await expect(taskBoard.toast()).toBeVisible();
        await expect(taskBoard.toast()).toContainText(title);

        await expect(taskBoard.taskItem(title)).toHaveCount(0);
    });
});