import { Locator } from '@playwright/test';
import Base from './Base';

class TextPage extends Base { 
    getItem(label: any): Locator {
        return this.page.getByText(label);
    }
}

export default TextPage;