import { test, expect } from '@playwright/test';
import RolesPage from '../components/Roles';

test.describe('Roles', () => {
    test('should find buttons by role', async ({ page }) => {
        const rolesPage = new RolesPage(page);
        await rolesPage.load();

        const primary = rolesPage.getButton('Primary Action');
        await expect(primary).toBeVisible();

        const toggle = rolesPage.getButton('Toggle Button');
        await expect(toggle).toBeVisible();

        const div = rolesPage.getButton('Div with button role');
        await expect(div).toBeVisible();
    });
});