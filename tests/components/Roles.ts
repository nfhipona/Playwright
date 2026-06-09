import { Locator, Page } from '@playwright/test';
import Base from './Base';

class RolesPage extends Base { 
    getButton(label: string): Locator {
        return this.page.getByRole('button', { name: label });
    }
}

export default RolesPage;