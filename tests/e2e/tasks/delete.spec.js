import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage';

test.describe('Delete', () => {
    test('task can be deleted (happy path)', async ({ page }) => {
        const email = 'sam@test.com';
        const password = 'password123';
        const expectedUser = email.split('@')[0];

        const login = new LoginPage(page);
        const taskBoard = new TaskBoardPage(page);
    });
});