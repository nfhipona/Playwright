import { test, expect } from '@playwright/test';
import LandingPage from '../components/saucedemo/LandingPage';

test.describe('Landing Page', () => {
    let landingPage: LandingPage;
    
    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.load();
    });

    test('should display the correct title', async () => {
        const pageURL = landingPage.getPageURL();
        expect(pageURL).toMatch(/.*saucedemo.*/);

        const title = landingPage.getTitle();
        await expect(title).toBeVisible();
        await expect(title).toHaveText('Swag Labs');
    });

    test('should have username and password input fields', async () => {
        const usernameInput = landingPage.getUsernameInput();
        const passwordInput = landingPage.getPasswordInput();
        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
    });
    
    test('should have a login button', async () => {
        const loginButton = await landingPage.getLoginButton();
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toHaveText('Login');
    });

    test('should have credentials legend visible', async () => {
        const credentialsLegend = await landingPage.getCredentialsLegend();
        await expect(credentialsLegend).toBeVisible();
    });
});