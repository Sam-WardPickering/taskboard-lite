import { LoginPage } from "../pages/LoginPage.js";
import { TaskBoardPage } from "../pages/TaskBoardPage.js";

export async function loginAs(page, user) {
    const login = new LoginPage(page);
    const taskBoard = new TaskBoardPage(page);

    await login.login(user.email, user.password);

    return { login, taskBoard };
}