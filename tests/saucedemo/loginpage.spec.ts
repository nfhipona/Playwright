import { test, expect } from '@playwright/test';
import LoginPage from '../components/saucedemo/LoginPage';

test.describe('Login Page', () => {
    let loginPage: LoginPage;
    const validUsername: string = 'standard_user';
    const validPassword: string = 'secret_sauce';
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.load();
    });

    test('should allow user to log in with valid credentials', async () => {
        await loginPage.login(validUsername, validPassword);
        await loginPage.waitForURL(/.*inventory.*/);

        const currentURL = loginPage.getPageURL();
        expect(currentURL).toMatch(/.*inventory.html/);

        const inventoryContainer = await loginPage.locateBy('.inventory_list');
        await expect(inventoryContainer).toBeVisible();

        const inventoryItems = await loginPage.locateBy('.inventory_item');
        await expect(inventoryItems).toHaveCount(6);

        const result = inventoryItems.filter({ hasText: 'Sauce Labs Backpack' });
        expect(result).toBeTruthy();
    });

    [
        {
            username: validUsername,
            password: '',
            expectedError: 'Epic sadface: Password is required'
        },
        {            
            username: validUsername,
            password: 'invalid_password',
            expectedError: 'Epic sadface: Username and password do not match any user in this service'
        },
        {
            username: '',
            password: validPassword,
            expectedError: 'Epic sadface: Username is required'
        },
        {
            username: '',
            password: '',
            expectedError: 'Epic sadface: Username is required'
        }
    ].forEach(({ username, password, expectedError }) => {
        test(`should show error message for credentials: ${username.length > 0 ? username : 'empty'} / ${password.length > 0 ? password : 'empty'}`, async () => {
            await loginPage.login(username, password);
            const errorMessage = loginPage.getByText(/epic sadface:/i);
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText(expectedError);
        });
    });
});