import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { testUsers } from '../../test-data/users.js';
import { uniqueTitle } from '../../helpers/id.js';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Tasks - Edit', () => {
    test('edit a task title (happy path)', async ({ page }) => {
        const title = uniqueTitle('Task - Created');
        const newTitle = uniqueTitle('Task - Edited')

        const due = todayISO();
        const priority = 'high';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });
        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.editTask(title, { title: newTitle });

        await expect(taskBoard.editForm()).not.toBeVisible();
        await expect(taskBoard.taskItem(title)).toHaveCount(0);
        await expect(taskBoard.taskItem(newTitle)).toBeVisible();

    });
    test('cancel task edits', async ({ page }) => {
        const title = uniqueTitle('Task - Created');
        const newTitle = uniqueTitle('Task - Edited');

        const due = todayISO();
        const priority = 'med';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });
        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.openEdit(title);

        // Open edit modal & change title
        await expect(taskBoard.editForm()).toBeVisible();
        await taskBoard.editTitleInput().fill(newTitle);

        // Confirm edit input was updated
        await expect(taskBoard.editTitleInput()).toHaveValue(newTitle);

        await taskBoard.cancelEdit();

        await expect(taskBoard.editForm()).not.toBeVisible();
        await expect(taskBoard.taskItem(newTitle)).toHaveCount(0);
        await expect(taskBoard.taskItem(title)).toBeVisible();

    });
});