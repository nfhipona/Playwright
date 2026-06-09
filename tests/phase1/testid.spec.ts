import { test, expect } from '@playwright/test';
import TestIDPage from '../components/TestID';

test.describe('Test ID Locators', () => {
    let testIDPage: TestIDPage;

    test.beforeEach(async ({ page }) => {
        testIDPage = new TestIDPage(page);
        await testIDPage.load();
    });

    test('should locate elements by their data-testid attribute', async () => {
        const profileCard = testIDPage.getItem('user-profile-card');
        await expect(profileCard).toBeVisible();

        const profileName = testIDPage.getItem('profile-name');
        await expect(profileName).toHaveText('John Doe');

        const profileButton = testIDPage.getItem('edit-profile-btn');
        await expect(profileButton).toHaveText('Edit Profile');

        const productGrid = testIDPage.getItem('product-grid');
        await expect(productGrid).toBeVisible();
    });

    [
        {
            testID: 'product-card-1',
            expectedTitle: 'Product A',
            expectedValue: '$19.99'
        },
        {
            testID: 'product-card-2',
            expectedTitle: 'Product B',
            expectedValue: '$29.99'
        },
        {
            testID: 'product-card-3',
            expectedTitle: 'Product C',
            expectedValue: '$39.99'
        },
    ].forEach(({ testID, expectedTitle, expectedValue }) => {
        test(`should locate product card with test ID ${testID} and verify its content`, async () => {
            const productCard = testIDPage.getItem(testID);
            await expect(productCard).toBeVisible();

            const title = productCard.getByTestId('product-name');
            await expect(title).toHaveText(expectedTitle);

            const value = productCard.getByTestId('product-price');
            await expect(value).toHaveText(expectedValue);
        });
    });

    test('should locate navigation with test IDs', async () => {
        const navigation = testIDPage.getItem('main-navigation');
        await expect(navigation).toBeVisible();

        const navHome = testIDPage.getItem('nav-home');
        await expect(navHome).toHaveText('Home');

        const navProducts = testIDPage.getItem('nav-products');
        await expect(navProducts).toHaveText('Products');

        const navContact = testIDPage.getItem('nav-contact');
        await expect(navContact).toHaveText('Contact');
    });
});