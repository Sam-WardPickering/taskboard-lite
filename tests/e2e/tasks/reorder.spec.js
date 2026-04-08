import { test, expect } from '../../fixtures/baseTest.js';
import { uniqueTitle } from '../../helpers/id.js';

test.describe('Tasks - Reorder', () => {
    test.only('task order updates after drag and drop', async ({ authenticatedPage: { taskBoard } }) => {
        const firstTask = uniqueTitle('First Task');
        const secondTask = uniqueTitle('Second Task');
        const thirdTask = uniqueTitle('Third Task');

        await taskBoard.createTask({ title: firstTask });
        await expect(taskBoard.taskItem(firstTask)).toBeVisible();

        await taskBoard.createTask({ title: secondTask });
        await expect(taskBoard.taskItem(secondTask)).toBeVisible();

        await taskBoard.createTask({ title: thirdTask });
        await expect(taskBoard.taskItem(thirdTask)).toBeVisible();

        await expect(taskBoard.taskItems()).toHaveCount(3);

        let itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([thirdTask, secondTask, firstTask]);

        await taskBoard.dragAndDropTask(firstTask, thirdTask);

        itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([firstTask, thirdTask, secondTask]);

        await taskBoard.dragAndDropTask(secondTask, thirdTask);

        itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([firstTask, secondTask, thirdTask]);

    })
});