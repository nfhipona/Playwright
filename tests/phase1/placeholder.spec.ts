import { test, expect } from '@playwright/test';
import PlaceholderPage from '../components/Placeholder';

test.describe('Placeholder Locators', () => {
    let placeholderPage: PlaceholderPage;

    test.beforeEach(async ({ page }) => {
        placeholderPage = new PlaceholderPage(page);
        await placeholderPage.load();
    });

    test('should locate input by placeholder text', async () => {
        const nameInput = placeholderPage.getInput('Enter your full name');
        await nameInput.fill('John Doe');
        await expect(nameInput).toHaveValue('John Doe');

        const phoneInput = placeholderPage.getInput('Phone number (xxx-xxx-xxxx)');
        await phoneInput.fill('123-456-7890');
        await expect(phoneInput).toHaveValue('123-456-7890');

        const messageInput = placeholderPage.getInput('Type your message here...');
        await messageInput.fill('Hello, this is a test message.');
        await expect(messageInput).toHaveValue('Hello, this is a test message.');

        const searchInput = placeholderPage.getInput('Search products...');
        await searchInput.fill('Laptop');
        await expect(searchInput).toHaveValue('Laptop');
    });
});