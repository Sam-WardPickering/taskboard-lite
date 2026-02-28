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
     * @param {{title: string, due?: string, priority?: 'low'|'med'|'high' }} task
     */
    async createTask({ title, due, priority }) {
        await this.titleInput.fill(title);

        if (due) await this.dueDateInput.fill(due);
        if (priority) await this.prioritySelect.selectOption(priority);

        await this.addTaskButton.click();
    }

    taskItem(title) {
        return this.page.getByTestId('todo-item').filter({ hasText: title });
    }

    async deleteTask(title) {
        const deleteTask = this.taskItem(title);
        await deleteTask.getByTestId('delete').click();
    }
}