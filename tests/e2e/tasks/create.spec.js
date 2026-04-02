import { test, expect } from '../../fixtures/baseTest.js';
import { todayISO } from '../../helpers/date.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Create', () => {
    test('create a task (happy path)', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskDueBadge(title)).toHaveText(`due ${due}`);
        await expect(taskBoard.taskPriorityBadge(title)).toHaveText(priority);
    });
});