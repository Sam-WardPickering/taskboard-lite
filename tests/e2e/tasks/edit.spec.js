import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { todayISO } from '../../helpers/date.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage';

test.describe('Tasks - Edit', () => {
    const email = 'sam@test.com';
    const password = 'password123';
    const expectedUser = email.split('@')[0];

    test('edit a task (happy path)', async ({ page }) => {
        const title = `Task ${Date.now()}`;
        const due = todayISO();
        const priority = 'high';

        gotoApp(page);

        

    });
});