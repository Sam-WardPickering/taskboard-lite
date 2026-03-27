import { page, expect } from '../../fixtures/baseTest.js';
import { gotoApp } from '../../helpers/navigation.js';
import { loginAs } from '../../helpers/auth.js';
import { uniqueTitle } from '../../helpers/id.js';
import { testUsers } from '../../test-data/users.js';

const user = testUsers.sam;

test.describe('Tasks - Bulk Actions', () => {
    test('all tasks are completed when Complete All is pressed', ({ page }) => {

    });
});