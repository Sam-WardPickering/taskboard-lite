export class AppShell {
    constructor(page) {
        this.page = page;
        this.themeToggle = page.getByTestId('theme-toggle');
    }

    async toggleTheme() {
        await this.themeToggle.click();
    }
}