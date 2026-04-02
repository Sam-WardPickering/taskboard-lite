import { test, expect } from '../../fixtures/baseTest.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Bulk Actions', () => {
    test('all tasks are completed when Complete All is pressed', async ({ authenticatedPage: { taskBoard } }) => {
        const taskOne = uniqueTitle('Task One');
        const taskTwo = uniqueTitle('Task Two');
        const taskThree = uniqueTitle('Task Three');

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
    test('completed tasks are removed when Clear completed is pressed', async ({ authenticatedPage: { taskBoard } }) => {
        const taskOne = uniqueTitle('Task One');
        const taskTwo = uniqueTitle('Task Two');
        const taskThree = uniqueTitle('Task Three');

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

        await expect(taskBoard.taskCheckbox(taskThree)).not.toBeChecked();

        await expect(taskBoard.taskItems()).toHaveCount(3);

        await taskBoard.clearCompleted();

        await expect(taskBoard.taskItems()).toHaveCount(1);

        await expect(taskBoard.taskItem(taskOne)).toHaveCount(0);
        await expect(taskBoard.taskItem(taskTwo)).toHaveCount(0);

        await expect(taskBoard.taskItem(taskThree)).toBeVisible();
        await expect(taskBoard.taskCheckbox(taskThree)).not.toBeChecked();
    });
});