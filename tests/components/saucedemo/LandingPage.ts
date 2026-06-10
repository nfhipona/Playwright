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

    getLoginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    async getCredentialsLegend(): Promise<Locator> {
        return this.locateBy('.login_credentials_wrap');
    }
}

export default LandingPage;