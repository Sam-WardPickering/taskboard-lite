import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { loginAs } from '../../helpers/auth.js';
import { uniqueTitle } from '../../helpers/id.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Tasks - Sort', () => {
    test('shows newest tasks first when sorted by Newest', async ({ page }) => {
        const firstTask = uniqueTitle('First Task');
        const secondTask = uniqueTitle('Second Task');
        const thirdTask = uniqueTitle('Third Task');

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: firstTask });
        await expect(taskBoard.taskItem(firstTask)).toBeVisible();

        await taskBoard.createTask({ title: secondTask });
        await expect(taskBoard.taskItem(secondTask)).toBeVisible();

        await taskBoard.createTask({ title: thirdTask });
        await expect(taskBoard.taskItem(thirdTask)).toBeVisible();

        await taskBoard.sortByNewest();

        const itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([thirdTask, secondTask, firstTask]);

    });
    test('shows tasks ordered by due date when sorted by Due Date', async ({ page }) => {
        const dueFirst = uniqueTitle('This is due first');
        const dueSecond = uniqueTitle('This is due second');
        const dueLast = uniqueTitle('This is due last');
        
        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({ title: dueFirst, due: '2026-03-01' });
        await expect(taskBoard.taskItem(dueFirst)).toBeVisible();

        await taskBoard.createTask({ title: dueSecond, due: '2026-06-01' });
        await expect(taskBoard.taskItem(dueSecond)).toBeVisible();

        await taskBoard.createTask({ title: dueLast, due: '2026-09-01'});
        await expect(taskBoard.taskItem(dueLast)).toBeVisible();

        await taskBoard.sortByDueDate();

        const itemList = await taskBoard.getTaskTitlesInOrder();
        expect(itemList).toEqual([dueFirst, dueSecond, dueLast]);
    });
});