import { Locator, Page } from '@playwright/test';
import Base from './Base';

class RolesPage extends Base { 
    getButton(label: string): Locator {
        return this.page.getByRole('button', { name: label });
    }

    getInput(label: string): Locator {
        return this.page.getByRole('textbox', { name: label });
    }

    getCheckbox(label: string): Locator {
        return this.page.getByRole('checkbox', { name: label });
    }

    getNavigation(): Locator {
        return this.page.getByRole('navigation').first();
    }

    getLists(): Locator {
        const navigation = this.getNavigation();
        return navigation.getByRole('menuitem');
    }

    getAlert(): Locator {
        return this.page.getByRole('alert');
    }
}

export default RolesPage;