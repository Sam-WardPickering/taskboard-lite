import { test, expect } from '../../fixtures/baseTest.js';
import { todayISO } from '../../helpers/date.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Create', () => {
    test('create a task (happy path)', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.toast()).toBeVisible();
        await expect(taskBoard.toast()).toContainText(title);

        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskDueBadge(title)).toHaveText(`due ${due}`);
        await expect(taskBoard.taskPriorityBadge(title)).toHaveText(priority);
    });
    test('shows validation error when submitting without a title', async ({ authenticatedPage: { taskBoard } }) => {
        await taskBoard.createTask({ title: "" });

        await expect(taskBoard.createErrorSpan).toBeVisible();
    })
   
});