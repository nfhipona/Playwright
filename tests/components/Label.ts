import { Locator } from '@playwright/test';
import Base from './Base';

class LabelPage extends Base {
    getSection(): Locator {
        return this.page.locator('#label-locators');
    }

    getLabel(label: string): Locator {
        const section = this.getSection();
        return section.getByLabel(label);
    }
}

export default LabelPage;