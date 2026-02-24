export class LoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.card = page.getByTestId('login-card');
        this.emailInput = page.getByTestId('login-email');
        this.passwordInput = page.getByTestId('login-password');
        this.signInButton = page.getByTestId('login-submit');
        this.signInError = page.getByTestId('login-error');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async getErrorText() {
        if (await this.signInError.isVisible()) {
            const text = await this.signInError.textContent();
            return text?.trim() ?? '';
        }
        return null;
    }
}