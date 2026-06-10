import { test, expect } from '@playwright/test';
import AltTextPage from '../components/phase1/AltText';

test.describe('Alt Text Locators', () => {
    let altTextPage: AltTextPage;

    test.beforeEach(async ({ page }) => {
        altTextPage = new AltTextPage(page);
        await altTextPage.load();
    });

    test('should locate image by alt text', async () => {
        const image = altTextPage.getImage('logo image');
        await expect(image).toBeVisible();
    });
});