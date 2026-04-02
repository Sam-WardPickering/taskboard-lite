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
        this.showAllButton = page.getByTestId('filter-all');
        this.showActiveButton = page.getByTestId('filter-active');
        this.showCompletedButton = page.getByTestId('filter-completed');
        this.emptyState = page.getByTestId('empty');
        this.searchInput = page.getByTestId('search');
        this.sortSelect = page.getByTestId('sort');
        this.markAllCompleteButton = page.getByTestId('bulk-complete');
        this.clearCompletedButton = page.getByTestId('clear-completed');
    }

    // Auth

    async logout() {
        await this.logoutButton.click();
    }

    // Task creation

    /**
     * @param {{title: string, due?: string, priority?: 'low'|'med'|'high' }} task
     */
    async createTask({ title, due, priority }) {
        await this.titleInput.fill(title);

        if (due) await this.dueDateInput.fill(due);
        if (priority) await this.prioritySelect.selectOption(priority);

        await this.addTaskButton.click();
    }

    // Task items

    taskItems() {
        return this.page.getByTestId('todo-item');
    }

    taskItem(title) {
        return this.page.getByTestId('todo-item').filter({ hasText: title });
    }

    taskCheckbox(title) {
        return this.taskItem(title).getByTestId('todo-item-toggle');
    }

    taskCheckboxes() {
        return this.page.getByTestId('todo-item-toggle');
    }

    taskPriorityBadge(title) {
        return this.taskItem(title).getByTestId('badge-priority');
    }

    taskDueBadge(title) {
        return this.taskItem(title).getByTestId('badge-due');
    }

    taskEditButton(title) {
        return this.taskItem(title).getByTestId('edit');
    }

    // Task actions

    async toggleTask(title) {
        const row = this.taskItem(title);
        await row.getByTestId('todo-item-toggle').click();
    }

    async deleteTask(title) {
        const row = this.taskItem(title);
        await row.getByTestId('delete').click();
    }

    // Edit modal

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

    async openEdit(title) {
        await this.taskEditButton(title).click();
    }

    async saveEdit() {
        await this.saveEditButton().click();
    }

    async cancelEdit() {
        await this.cancelEditButton().click();
    }

    /**
     * @param {string} title
     * @param {{ title?: string, due?: string, priority?: 'low'|'med'|'high', completed?: boolean }} updates
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

    // Filtering & search

    async showAll() {
        await this.showAllButton.click();
    }

    async showActive() {
        await this.showActiveButton.click();
    }

    async showCompleted() {
        await this.showCompletedButton.click();
    }

    async searchTask(value) {
        await this.searchInput.fill(value);
    }

    // Sorting

    async sortByNewest() {
        await this.sortSelect.selectOption('created_desc');
    }

    async sortByDueDate() {
        await this.sortSelect.selectOption('due_asc');
    }

    async sortByPriority() {
        await this.sortSelect.selectOption('priority_desc');
    }

    async getTaskTitlesInOrder() {
        return await this.taskItems().locator('.task-text').allTextContents();
    }

    // Bulk actions

    async markAllCompleted() {
        await this.markAllCompleteButton.click();
    }

    async clearCompleted() {
        await this.clearCompletedButton.click();
    }
}