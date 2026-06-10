import { Locator } from '@playwright/test';
import Base from './Base';

class LandingPage extends Base {
    getTitle(): Locator {
        return this.page.getByText('Swag Labs');
    }

    getUsernameInput(): Locator {
        return this.page.getByPlaceholder('Username');
    }

    getPasswordInput(): Locator {
        return this.page.getByPlaceholder('Password');
    }

    async getLoginButton(): Promise<Locator> {
        return this.locateBy('#login-button');
    }

    async getCredentialsLegend(): Promise<Locator> {
        return this.locateBy('#login_credentials');
    }

    getPageURL(): string {
        return this.page.url();
    }
}

export default LandingPage;