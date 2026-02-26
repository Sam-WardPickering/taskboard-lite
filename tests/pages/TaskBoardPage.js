export class TaskBoardPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.card = page.getByTestId('app-card');
        this.logoutButton = page.getByTestId('logout');
        this.userName = page.getByTestId('user-name');
        this.titleInput = page.getByTestId('create-title');
        this.dueDateInput = page.getByTestId('create-due');
        this.prioritySelect = page.getByTestId('create-priority');
        this.addTaskButton = page.getByTestId('create-submit');
    }

    async logout() {
        await this.logoutButton.click();
    }

    /**
     * @param {{title: string, due?: string, priority?: 'Low'|'Medium'|'High' }} task
     */
    async createTask({ title, due, priority }) {
        
    };
}