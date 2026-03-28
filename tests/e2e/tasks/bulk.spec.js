import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { loginAs } from '../../helpers/auth.js';
import { uniqueTitle } from '../../helpers/id.js';
import { testUsers } from '../../test-data/users.js';
import { title } from 'node:process';

const user = testUsers.sam;

test.describe('Tasks - Bulk Actions', () => {
    test('all tasks are completed when Complete All is pressed', async ({ page }) => {
        const taskOne = uniqueTitle('Task One');
        const taskTwo = uniqueTitle('Task Two');
        const taskThree = uniqueTitle('Task Three');

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: taskOne });
        await expect(taskBoard.taskItem(taskOne)).toBeVisible();

        await taskBoard.createTask({ title: taskTwo });
        await expect(taskBoard.taskItem(taskTwo)).toBeVisible();

        await taskBoard.createTask({ title: taskThree });
        await expect(taskBoard.taskItem(taskThree)).toBeVisible();

        await expect(taskBoard.taskItems()).toHaveCount(3);

        await taskBoard.markAllCompleted();

        await expect(taskBoard.taskCheckboxes()).toHaveCount(3);

        await expect(taskBoard.taskCheckbox(taskOne)).toBeChecked();
        await expect(taskBoard.taskCheckbox(taskTwo)).toBeChecked();
        await expect(taskBoard.taskCheckbox(taskThree)).toBeChecked();

    });
    test('completed tasks are removed when Clear completed is pressed', async ({ page }) => {
        const taskOne = uniqueTitle('Task One');
        const taskTwo = uniqueTitle('Task Two');
        const taskThree = uniqueTitle('Task Three');

        await gotoApp(page);

        const { taskBoard} = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: taskOne });
        await expect(taskBoard.taskItem(taskOne)).toBeVisible();

        await taskBoard.createTask({ title: taskTwo });
        await expect(taskBoard.taskItem(taskTwo)).toBeVisible();

        await taskBoard.createTask({ title: taskThree });
        await expect(taskBoard.taskItem(taskThree)).toBeVisible();
        
        // Complete taskOne & taskTwo
        await taskBoard.toggleTask(taskOne);
        await expect(taskBoard.taskCheckbox(taskOne)).toBeChecked();

        await taskBoard.toggleTask(taskTwo);
        await expect(taskBoard.taskCheckbox(taskTwo)).toBeChecked();

    })
});