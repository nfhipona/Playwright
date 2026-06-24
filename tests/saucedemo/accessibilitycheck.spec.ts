import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.use({ 
    video: 'off', 
    screenshot: { 'mode': 'on', 'fullPage': false }
});

test.describe('Accessibility checks', () => {
    test('should have accessibility violations as expected', async ({ page }, testInfo) => {
        await page.goto('http://localhost:3000');

        const axe = new AxeBuilder({ page });
        axe.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
        axe.disableRules(['duplicate-id']);
        const scanResult = await axe.analyze();

        expect(scanResult.violations.length).toBeGreaterThan(0);

        testInfo.attach(`${scanResult.violations.length} violations - accessibility-report`, {
            body: JSON.stringify(scanResult, null, 2),
            contentType: 'application/json'}
        );
    });
});