import { test, expect } from '@playwright/test';
import TextPage from '../components/Text';

test.describe('Text Locators', () => {
    let textPage: TextPage;

    test.beforeEach(async ({ page }) => {
        textPage = new TextPage(page);
        await textPage.load();
    });

    test('should find elements by their associated texts', async () => {
        const textcontent = textPage.getItem(/Locate elements by their text content./i);
        await expect(textcontent).toBeVisible();

        const paragraph1 = textPage.getItem(/This paragraph contains some/i);
        await expect(paragraph1).toContainText('important');

        const paragraph2 = textPage.getItem(/Another paragraph with\s/i);
        await expect(paragraph2).toContainText('colored text');

        const item1 = textPage.getItem('List item 1');
        await expect(item1).toBeVisible();

        const item2 = textPage.getItem(/List item 2 with link/i);
        await expect(item2).toBeVisible();

        const item3 = textPage.getItem(/Special: Unique text identifier/i);
        await expect(item3).toBeVisible();

        const button = textPage.getItem('Submit Form');
        await expect(button).toBeVisible();

        const buttonLabel = textPage.getItem('Click the button above to submit your information.');
        await expect(buttonLabel).toBeVisible();
    });
});