import { test, expect } from '../../fixtures/baseTest.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Sort', () => {
    test('shows newest tasks first when sorted by Newest', async ({ authenticatedPage: { taskBoard } }) => {
        const firstTask = uniqueTitle('First Task');
        const secondTask = uniqueTitle('Second Task');
        const thirdTask = uniqueTitle('Third Task');

        await taskBoard.createTask({ title: firstTask });
        await expect(taskBoard.taskItem(firstTask)).toBeVisible();

        await taskBoard.createTask({ title: secondTask });
        await expect(taskBoard.taskItem(secondTask)).toBeVisible();

        await taskBoard.createTask({ title: thirdTask });
        await expect(taskBoard.taskItem(thirdTask)).toBeVisible();

        await taskBoard.sortByNewest();

        await expect(taskBoard.taskItems()).toHaveCount(3);

        const itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([thirdTask, secondTask, firstTask]);

    });
    test('shows tasks ordered by due date when sorted by Due Date', async ({ authenticatedPage: { taskBoard } }) => {
        const dueFirst = uniqueTitle('This is due first');
        const dueSecond = uniqueTitle('This is due second');
        const dueLast = uniqueTitle('This is due last');

        await taskBoard.createTask({ title: dueFirst, due: '2026-03-01' });
        await expect(taskBoard.taskItem(dueFirst)).toBeVisible();

        await taskBoard.createTask({ title: dueSecond, due: '2026-06-01' });
        await expect(taskBoard.taskItem(dueSecond)).toBeVisible();

        await taskBoard.createTask({ title: dueLast, due: '2026-09-01'});
        await expect(taskBoard.taskItem(dueLast)).toBeVisible();

        await taskBoard.sortByDueDate();

        await expect(taskBoard.taskItems()).toHaveCount(3);

        const itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([dueFirst, dueSecond, dueLast]);
    });
    test('shows tasks ordered by priority when sorted by Priority', async ({ authenticatedPage: { taskBoard } }) => {
        const priorityLow = uniqueTitle('Low Priority');
        const priorityMed = uniqueTitle('Medium Priority');
        const priorityHigh = uniqueTitle('High Priority');

        await taskBoard.createTask({ title: priorityLow, priority: 'low' });
        await expect(taskBoard.taskItem(priorityLow)).toBeVisible();

        await taskBoard.createTask({ title: priorityMed, priority: 'med' });
        await expect(taskBoard.taskItem(priorityMed)).toBeVisible();

        await taskBoard.createTask({ title: priorityHigh, priority: 'high' });
        await expect(taskBoard.taskItem(priorityHigh)).toBeVisible();

        await taskBoard.sortByPriority();

        await expect(taskBoard.taskItems()).toHaveCount(3);

        const itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([priorityHigh, priorityMed, priorityLow]);
    });
});