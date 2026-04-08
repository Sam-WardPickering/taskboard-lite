import { LoginPage, TaskBoardPage } from "../pages/index.js";

export async function loginAs(page, user) {
    const login = new LoginPage(page);
    const taskBoard = new TaskBoardPage(page);

    await login.login(user.email, user.password);

    return { login, taskBoard };
}