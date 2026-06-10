import { Locator } from '@playwright/test';
import Base from './Base';

class PlaceholderPage extends Base {
    getSection(): Locator {
        return this.page.locator('#placeholder-locators');
    }

    getInput(label: string): Locator {
        const section = this.getSection();
        return section.getByPlaceholder(label);
    }
}

export default PlaceholderPage;