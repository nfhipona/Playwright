import { test, expect } from '@playwright/test';
import CheckoutCompletePage from '../components/saucedemo/CheckoutCompletePage';

test.describe('Checkout Complete Page', () => {
    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.load();
        await checkoutCompletePage.prepareCheckoutCompletePage();
    });

    test('should display the correct checkout complete logo, title and message', async () => {
        const checkoutLogo = await checkoutCompletePage.getCheckoutLogo();
        const pageTitle = await checkoutCompletePage.getCheckoutTitle();
        const completeTitle = await checkoutCompletePage.getCheckoutCompleteTitle();
        const completeMessage = await checkoutCompletePage.getCheckoutCompleteMessage();

        await expect(checkoutLogo).toBeVisible();
        await expect(pageTitle).toHaveText('Checkout: Complete!');
        await expect(completeTitle).toHaveText('Thank you for your order!');
        await expect(completeMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    test('should navigate back to the home page when clicking the Back Home button', async () => {
        await checkoutCompletePage.clickBackHomeButton();

        const pageURL = checkoutCompletePage.getPageURL();
        expect(pageURL).toMatch(/.*inventory.html/);
    });
});