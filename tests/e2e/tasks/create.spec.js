import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { testUsers } from '../../test-data/users.js';
import { uniqueTitle } from '../../helpers/id.js';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Tasks - Create', () => {
    test('create a task (happy path)', async ({ page }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'high';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskDueBadge(title)).toHaveText(`due ${due}`);
        await expect(taskBoard.taskPriorityBadge(title)).toHaveText(priority);
    });

    test('task and session persist after reload', async ({ page }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'med';

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskDueBadge(title)).toHaveText(`due ${due}`);
        await expect(taskBoard.taskPriorityBadge(title)).toHaveText(priority);

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskDueBadge(title)).toHaveText(`due ${due}`);
        await expect(taskBoard.taskPriorityBadge(title)).toHaveText(priority);

    });
});