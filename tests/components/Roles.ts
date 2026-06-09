import { Locator } from '@playwright/test';
import Base from './Base';

class RolesPage extends Base { 
    getSection(): Locator {
        return this.page.locator('#role-locators');
    }

    getButton(label: string): Locator {
        const section = this.getSection();
        return section.getByRole('button', { name: label });
    }

    getInput(label: string): Locator {
        const section = this.getSection();
        return section.getByRole('textbox', { name: label });
    }

    getCheckbox(label: string): Locator {
        const section = this.getSection();
        return section.getByRole('checkbox', { name: label });
    }

    getNavigation(): Locator {
        const section = this.getSection();
        return section.getByRole('navigation');
    }

    getLists(): Locator {
        const navigation = this.getNavigation();
        return navigation.getByRole('menuitem');
    }

    getAlert(): Locator {
        const section = this.getSection();
        return section.getByRole('alert');
    }
}

export default RolesPage;