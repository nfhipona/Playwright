import { Locator } from '@playwright/test';
import LandingPage from './LandingPage';

class LoginPage extends LandingPage {
    async login(username: string, password: string): Promise<void> {
        await this.getUsernameInput().fill(username);
        await this.getPasswordInput().fill(password);
        const loginButton = await this.getLoginButton();
        await loginButton.click();
    }

    getByText(name: any): Locator {
        return this.page.getByText(name);
    }
}

export default LoginPage;