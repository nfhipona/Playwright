import { test, expect } from '@playwright/test';
import LandingPage from '../components/saucedemo/LandingPage';

test.describe('Landing Page', () => {
    let landingPage: LandingPage;
    
    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page);
        await landingPage.load();
    });

    test('should display the correct title', async () => {
        const title = landingPage.getTitle();
        await expect(title).toBeVisible();
    });

    test('should have username and password input fields', async () => {
        const usernameInput = landingPage.getUsernameInput();
        const passwordInput = landingPage.getPasswordInput();
        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
    });
    
    test('should have a login button', async () => {
        const loginButton = landingPage.getLoginButton();
        await expect(loginButton).toBeVisible();
    });

    test('should have credentials legend visible', async () => {
        const credentialsLegend = await landingPage.getCredentialsLegend();
        await expect(credentialsLegend).toBeVisible();
    });
});