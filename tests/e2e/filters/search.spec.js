import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { testUsers } from '../../test-data/users';
import { uniqueTitle } from '../../helpers/id';
import { loginAs } from '../../helpers/auth.js';

const user = testUsers.sam;

test.describe('Tasks - Search', () => { 
    test('filtering valid task value returns corresponding task', async ({ page }) => {
        const task1 = 'Task One';
        const task2 = 'Task Two';
        
        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        await taskBoard.createTask({title: task1});
        await expect(taskBoard.taskItem(task1)).toBeVisible();
    });
});