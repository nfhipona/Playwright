import { Locator } from '@playwright/test';
import Base from './Base';

class TitlePage extends Base {
    getSection(): Locator {
        return this.page.locator('#title-locators');
    }
    
    getItem(label: string): Locator {
        const section = this.getSection();
        return section.getByTitle(label);
    }
}

export default TitlePage;