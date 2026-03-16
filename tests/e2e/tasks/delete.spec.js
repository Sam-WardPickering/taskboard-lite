import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { testUsers } from '../../test-data/users.js';
import { uniqueTitle } from '../../helpers/id.js';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Tasks - Delete', () => {
    test('task can be deleted (happy path)', async ({ page }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.deleteTask(title);

        await expect(taskBoard.taskItem(title)).toHaveCount(0);
    });

    test('task deletion persists after reload', async ({ page }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'med';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.deleteTask(title);

        await expect(taskBoard.taskItem(title)).toHaveCount(0);

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
        await expect(taskBoard.taskItem(title)).toHaveCount(0);

    });
});