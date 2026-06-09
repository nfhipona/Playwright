import { test, expect } from '@playwright/test';
import LabelPage from '../components/Label';

test.describe('Label Locators', () => {
    let labelPage: LabelPage;

    test.beforeEach(async ({ page }) => {
        labelPage = new LabelPage(page);
        await labelPage.load();
    });

    test('should find elements by their associated labels', async () => {
        const emailInput = labelPage.getLabel('Email Address:');
        await emailInput.fill('nfhipona@users.noreply.github.com');
        await expect(emailInput).toHaveValue('nfhipona@users.noreply.github.com');

        const passwordInput = labelPage.getLabel('Password:');
        await passwordInput.fill('my_secure_password');
        await expect(passwordInput).toHaveValue('my_secure_password');

        const ageInput = labelPage.getLabel('Age:');
        await ageInput.fill('99');
        await expect(ageInput).toHaveValue('99');

        const standardCheckbox = labelPage.getLabel('Standard');
        await standardCheckbox.check();
        await expect(standardCheckbox).toBeChecked();

        const expressCheckbox = labelPage.getLabel('Express');
        await expressCheckbox.check();
        await expect(expressCheckbox).toBeChecked();
    });
});