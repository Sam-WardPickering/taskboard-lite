import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Tasks - Edit', () => {
    test('edit a task title (happy path)', async ({ page }) => {
        const id = Date.now();

        const title = `Task 1 - Created - ${id}`;
        const newTitle = `Task 1 - Edited - ${id}`;

        const due = todayISO();
        const priority = 'high';

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(user.email, user.password);
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
        const id = Date.now();

        const title = `Task 2 - Created - ${id}`;
        const newTitle = `Task 2 - Edited - ${id}`;

        const due = todayISO();
        const priority = 'med';

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(user.email, user.password);
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
    test('edit fields persist after reload', async ({ page }) => {
        const id = Date.now();

        const title = `Task 3 - Created - ${id}`;
        const newTitle = `Task 3 - Edited - ${id}`;

        const due = todayISO();
        const newDue = '2029-03-05';

        const priority = 'low';
        const newPriority = 'high';

        await gotoApp(page);

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);

        await login.login(user.email, user.password);
        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

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

        // Verify task persistence
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
});