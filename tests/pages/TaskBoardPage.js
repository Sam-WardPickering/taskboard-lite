export class TaskBoardPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.card = page.getByTestId('app-card');
        this.logoutButton = page.getByTestId('logout');
        this.userName = page.getByTestId('user-name');
        this.taskInput = page.getByTestId('create-title');
        this.taskDueDate = page.getByTestId('create-due');
        this.taskPriority = page.getByTestId('create-priority');
        this.addTask = page.getByTestId('create-submit');
    }

    async logout() {
        await this.logoutButton.click();
    }
}