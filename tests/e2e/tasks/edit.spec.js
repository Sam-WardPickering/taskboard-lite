import { test, expect } from '../../fixtures/baseTest.js';
import { todayISO } from '../../helpers/date.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Edit', () => {
    test('edit a task title (happy path)', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle('Task - Created');
        const newTitle = uniqueTitle('Task - Edited')

        const due = todayISO();
        const priority = 'high';

        await taskBoard.createTask({ title, due, priority });
        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.editTask(title, { title: newTitle });

        await expect(taskBoard.toast()).toBeVisible();
        await expect(taskBoard.toast()).toContainText(newTitle);

        await expect(taskBoard.editForm).not.toBeVisible();
        await expect(taskBoard.taskItem(title)).toHaveCount(0);
        await expect(taskBoard.taskItem(newTitle)).toBeVisible();

    });
    test('cancel task edits', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle('Task - Created');
        const newTitle = uniqueTitle('Task - Edited');

        const due = todayISO();
        const priority = 'med';

        await taskBoard.createTask({ title, due, priority });
        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.openEdit(title);

        // Open edit modal & change title
        await expect(taskBoard.editForm).toBeVisible();
        await taskBoard.editTitleInput.fill(newTitle);

        // Confirm edit input was updated
        await expect(taskBoard.editTitleInput).toHaveValue(newTitle);

        await taskBoard.cancelEdit();

        await expect(taskBoard.editForm).not.toBeVisible();
        await expect(taskBoard.taskItem(newTitle)).toHaveCount(0);
        await expect(taskBoard.taskItem(title)).toBeVisible();

    });
});