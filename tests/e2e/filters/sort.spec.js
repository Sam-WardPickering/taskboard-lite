import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { loginAs } from '../../helpers/auth.js';
import { uniqueTitle } from '../../helpers/id.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Tasks - Sort', () => {
    test('tasks are sorted by newest', async ({ page }) => {
        const firstTask = uniqueTitle('First Task');
        const secondTask = uniqueTitle('Second Task');
        const thirdTask = uniqueTitle('Third Task');

        await gotoApp(page);

        const { taskBoard } = await loginAs(page, user);

        await expect(taskBoard.card).toBeVisible();
        await expect(taskBoard.userName).toHaveText(user.expectedUser);

        
    })
});