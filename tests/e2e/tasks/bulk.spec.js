import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { loginAs } from '../../helpers/auth.js';
import { uniqueTitle } from '../../helpers/id.js';
import { testUsers } from '../../test-data/users.js';

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
        await taskBoard.createTask({ title: taskTwo });
        await taskBoard.createTask({ title: taskThree });

        


    });
});