import { test, expect } from '@playwright/test';
import CheckoutPage from '../components/saucedemo/CheckoutPage';

test.describe('Checkout Page', () => {
    let checkoutPage: CheckoutPage;
    const checkoutStepOneURLPattern: RegExp = /.*checkout-step-one.html/;
    const checkoutStepTwoURLPattern: RegExp = /.*checkout-step-two.html/;
    const cartURLPattern: RegExp = /.*cart.html/;
    const firstName: string = 'eNeF';
    const lastName: string = 'Swag';
    const postalCode: string = '4031';

    test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        await checkoutPage.load();
        await checkoutPage.prepareCheckoutPage();
    });

    test('should display the correct checkout information title and in correct URL', async () => {
        const checkoutTitle = await checkoutPage.getCheckoutTitle();
        await expect(checkoutTitle).toHaveText('Checkout: Your Information');

        const pageURL = checkoutPage.getPageURL();
        expect(pageURL).toMatch(checkoutStepOneURLPattern);
    });

    test('should have input fields for first name, last name, and postal code', async () => {
        const firstNameInput = await checkoutPage.firstNameInput();
        const lastNameInput = await checkoutPage.lastNameInput();
        const postalCodeInput = await checkoutPage.postalCodeInput();

        await expect(firstNameInput).toBeVisible();
        await expect(lastNameInput).toBeVisible();
        await expect(postalCodeInput).toBeVisible();
    });

    test('should fill in the checkout information and proceed to the next step', async () => {
        await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
        await checkoutPage.clickContinueButton();

        const pageURL = checkoutPage.getPageURL();
        expect(pageURL).toMatch(checkoutStepTwoURLPattern);
    });

    test('should cancel the checkout process and return to the cart page', async () => {
        const checkoutTitle = await checkoutPage.getCheckoutTitle();
        await expect(checkoutTitle).toHaveText('Checkout: Your Information');

        await checkoutPage.clickCancelButton();

        const pageURL = checkoutPage.getPageURL();
        expect(pageURL).toMatch(cartURLPattern);
    });
});