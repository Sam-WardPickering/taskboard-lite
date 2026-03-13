import { test, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { TaskBoardPage } from '../../pages/TaskBoardPage.js';
import { testUsers } from '../../test-data.js';

const user = testUsers.sam;

test('loads login screen', async ({ page }) => {
    await gotoApp(page);
    const login = new LoginPage(page);
    await expect(login.card).toBeVisible();
});


test('can login (happy path)', async ({ page }) => {
    await gotoApp(page);

    const login = new LoginPage(page);
    const taskBoard = new TaskBoardPage(page); 

    // Login form is visible
    await expect(login.card).toBeVisible();

    await login.login(user.email, user.password);

    // Dashboard visible.
    await expect(taskBoard.card).toBeVisible();

    // Username visible and correct.
    await expect(taskBoard.userName).toHaveText(user.expectedUser);
});