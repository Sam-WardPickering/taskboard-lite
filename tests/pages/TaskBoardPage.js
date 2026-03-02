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

    async openEdit(title) {
        this.taskEditButton(title).click();
    }

    editForm() {
        return this.page.getByTestId('edit-form');
    }

    editTitleInput() {
        return this.editForm().getByTestId('edit-title');
    }

    editDueDateInput() {
        return this.editForm().getByTestId('edit-due');
    }

    editPrioritySelect() {
        return this.editForm().getByTestId('edit-priority');
    }

    editCompletedCheckbox() {
        return this.editForm().getByTestId('edit-completed');
    }

    saveEditButton() {
        return this.editForm().getByTestId('edit-save');
    }

    cancelEditButton() {
        return this.editForm().getByTestId('edit-cancel');
    }

    async saveEdit() {
        await this.saveEditButton().click();
    }

    async cancelEdit() {
        await this.cancelEditButton().click();
    }

    /**
     * @param {string} title
     * @param {{ title?: string, due?: string, priority?: 'low'|'med'|'high', completed?: boolean }}
     */
    async editTask(title, updates) {
        await this.openEdit(title);

        if (updates.title !== undefined) await this.editTitleInput().fill(updates.title);
        if (updates.due !== undefined) await this.editDueDateInput().fill(updates.due);
        if (updates.priority !== undefined) await this.editPrioritySelect().selectOption(updates.priority);

        if (typeof updates.completed === 'boolean') {
            const checkbox = this.editCompletedCheckbox();
            await (updates.completed ? checkbox.check() : checkbox.uncheck());
        }

        await this.saveEdit();
    }
    
}