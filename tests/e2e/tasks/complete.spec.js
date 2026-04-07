import { test, expect } from '../../fixtures/baseTest.js';
import { todayISO } from '../../helpers/date.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Complete', () => {
    test('complete a task (happy path)', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        // Complete task
        await taskBoard.toggleTask(title);
        await expect(taskBoard.toast()).toBeVisible();
        await expect(taskBoard.toast()).toContainText('Marked complete');
        await expect(taskBoard.taskCheckbox(title)).toBeChecked();

        // Undo completion
        await taskBoard.toggleTask(title);
        await expect(taskBoard.taskCheckbox(title)).not.toBeChecked();

    });
});