import { test, expect } from '@playwright/test';
import RolesPage from '../components/Roles';

test.describe('Roles Locators', () => {
    let rolesPage: RolesPage;

    test.beforeEach(async ({ page }) => {
        rolesPage = new RolesPage(page);
        await rolesPage.load();
    });

    test('should find buttons by role', async () => {
        const primary = rolesPage.getButton('Primary Action');
        await expect(primary).toBeVisible();

        const toggle = rolesPage.getButton('Toggle Button');
        await expect(toggle).toBeVisible();

        const div = rolesPage.getButton('Div with button role');
        await expect(div).toBeVisible();
    });

    test('should find form elements by role', async () => {
        const input = rolesPage.getInput('username');
        await input.fill('my_username_text');
        await expect(input).toHaveValue('my_username_text');

        const checkbox = rolesPage.getCheckbox('Accept terms');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    });

    test('should find navigation elements by role', async () => {
        const links = rolesPage.getNavigation();
        await expect(links).toBeVisible();

        const listItems = rolesPage.getLists();
        await expect(listItems).toHaveCount(3);

        const homeLink = listItems.nth(0);
        await expect(homeLink).toHaveText('Home');

        const productsLink = listItems.nth(1);
        await expect(productsLink).toHaveText('Products');

        const contactLink = listItems.nth(2);
        await expect(contactLink).toHaveText('Contact');

        const alert = rolesPage.getAlert();
        await expect(alert).toHaveText(/this is an important alert message!/i);
    });
});