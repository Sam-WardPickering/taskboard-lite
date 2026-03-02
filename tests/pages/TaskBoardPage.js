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
        this.editTitleInput = page.getByTestId('edit-title');
        this.editDueDateInput = page.getByTestId('edit-due');
        this.editPrioritySelect = page.getByTestId('edit-priority');
        this.editCompleted = page.getByTestId('edit-completed');
        this.saveEditButton = page.getByTestId('edit-save');
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
        const row = this.taskItem(title);
        await row.getByTestId('delete').click();
    }

    async toggleTask(title) {
        const row = this.taskItem(title);
        await row.getByTestId('todo-item-toggle').click();
    }

   taskCheckbox(title) {
        return this.taskItem(title).getByTestId('todo-item-toggle');
    }

    taskEditButton(title) {
        return this.taskItem(title).getByTestId('edit');
    }

    opedEdit(title) {
        this.taskEditButton(title).click();
    }

    /**
     * @param {{title: string, due?: string, priority?: 'low'|'med'|'high' }} task
     */
    async editTask({ title, due, priority }) {
        await this.titleInput.fill(title);

        if (due) await this.dueDateInput.fill(due);
        if (priority) await this.prioritySelect.selectOption(priority);

        await this.addTaskButton.click();
    }
    
}