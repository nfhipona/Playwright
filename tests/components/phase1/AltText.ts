import { Locator } from '@playwright/test';
import Base from './Base';

class AltTextPage extends Base {
    getSection(): Locator {
        return this.page.locator('#alttext-locators');
    }

    getImage(label: string): Locator {
        const section = this.getSection();
        return section.getByAltText(label);
    }
}

export default AltTextPage;