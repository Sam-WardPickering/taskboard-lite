import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { testUsers } from '../../test-data/users.js';
import { uniqueTitle } from '../../helpers/id.js';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Tasks - Complete', () => {
    test('complete a task (happy path)', async ({ page }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        // Complete task
        await taskBoard.toggleTask(title);
        await expect(taskBoard.taskCheckbox(title)).toBeChecked();

        // Undo completion
        await taskBoard.toggleTask(title);
        await expect(taskBoard.taskCheckbox(title)).not.toBeChecked();

    });

    test('completion persists after reload', async ({ page }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'med';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        // Complete task
        await taskBoard.toggleTask(title);
        await expect(taskBoard.taskCheckbox(title)).toBeChecked();

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskCheckbox(title)).toBeChecked();
    });
});