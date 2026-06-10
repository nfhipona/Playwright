import { test, expect } from '@playwright/test';
import TitlePage from '../components/phase1/Title';

test.describe('Title Locators', () => {
    let titlePage: TitlePage;

    test.beforeEach(async ({ page }) => {
        titlePage = new TitlePage(page);
        await titlePage.load();
    });

    test('should locate elements by their title attribute', async () => {
        const homeLink = titlePage.getItem('Home page link');
        await expect(homeLink).toBeVisible();
        await expect(homeLink).toHaveText('Home');

        const profileLink = titlePage.getItem('HyperText Markup Language');
        await expect(profileLink).toBeVisible();
        await expect(profileLink).toHaveText('HTML');

        const tooltipLink = titlePage.getItem('Tooltip text');
        await expect(tooltipLink).toBeVisible();
        await expect(tooltipLink).toHaveText('This text has a tooltip');
    });
});