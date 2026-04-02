import { test, expect } from '../../fixtures/baseTest.js';
import { uniqueTitle } from '../../helpers/id.js';
import { todayISO } from '../../helpers/date.js';

test.describe('Persistence', () => {
    test('created task persists after reload', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'med';

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

    test('edited task persists after reload', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle('Task - Created');
        const newTitle = uniqueTitle('Task - Edited');

        const due = todayISO();
        const newDue = '2029-03-05';

        const priority = 'low';
        const newPriority = 'high';

        await taskBoard.createTask({ title, due, priority });
        await expect(taskBoard.taskItem(title)).toBeVisible();

        await taskBoard.editTask(title, { 
            title: newTitle, 
            due: newDue, 
            priority: newPriority,
            completed: true
        });

        await expect(taskBoard.taskItem(newTitle)).toBeVisible();

        await expect(taskBoard.taskDueBadge(newTitle)).toHaveText(`due ${newDue}`);
        await expect(taskBoard.taskPriorityBadge(newTitle)).toHaveText(newPriority);
        await expect(taskBoard.taskCheckbox(newTitle)).toBeChecked();

        await expect(taskBoard.taskItem(title)).toHaveCount(0);

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await expect(taskBoard.taskItem(newTitle)).toBeVisible();
        await expect(taskBoard.taskItem(title)).toHaveCount(0);

        await taskBoard.openEdit(newTitle);
        await expect(taskBoard.editForm()).toBeVisible();

        await expect(taskBoard.editTitleInput()).toHaveValue(newTitle);
        await expect(taskBoard.editDueDateInput()).toHaveValue(newDue);
        await expect(taskBoard.editPrioritySelect()).toHaveValue(newPriority);
        await expect(taskBoard.editCompletedCheckbox()).toBeChecked();

        await taskBoard.cancelEdit();
        await expect(taskBoard.editForm()).not.toBeVisible();
    });

    test('completed task persists after reload', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'med';

        await taskBoard.createTask({ title, due, priority });

        await expect(taskBoard.taskItem(title)).toBeVisible();

        // Complete task
        await taskBoard.toggleTask(title);
        await expect(taskBoard.taskCheckbox(title)).toBeChecked();
        await expect(taskBoard.taskItem(title)).toHaveClass(/completed/);

        await page.reload();

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);
        await expect(taskBoard.taskItem(title)).toBeVisible();
        await expect(taskBoard.taskCheckbox(title)).toBeChecked();
    });

    test('deleted task remains deleted after reload', async ({ authenticatedPage: { taskBoard } }) => {
        const title = uniqueTitle();
        const due = todayISO();
        const priority = 'med';

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
