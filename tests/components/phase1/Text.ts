import { Locator } from '@playwright/test';
import Base from './Base';

class TextPage extends Base { 
    getSection(): Locator {
        return this.page.locator('#text-locators');
    }

    getItem(label: any): Locator {
        const section = this.getSection();
        return section.getByText(label);
    }
}

export default TextPage;