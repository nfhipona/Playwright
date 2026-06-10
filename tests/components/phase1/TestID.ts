import { Locator } from '@playwright/test';
import Base from './Base';

class TestIDPage extends Base {
    getSection(): Locator {
        return this.page.locator('#testid-locators');
    }

    getItem(label: string): Locator {
        const section = this.getSection();
        return section.getByTestId(label);
    }
}

export default TestIDPage;