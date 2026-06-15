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

    [
        {
            firstName: '',
            lastName: 'Swag',
            postalCode: '4031',
            errorMessage: 'Error: First Name is required'
        },
        {
            firstName: 'eNeF',
            lastName: '',
            postalCode: '4031',
            errorMessage: 'Error: Last Name is required'
        },
        {
            firstName: 'eNeF',
            lastName: 'Swag',
            postalCode: '',
            errorMessage: 'Error: Postal Code is required'
        },
        {
            firstName: '',
            lastName: '',
            postalCode: '',
            errorMessage: 'Error: First Name is required'
        },
    ].forEach(({ firstName, lastName, postalCode, errorMessage }) => {
        test(`should display error message "${errorMessage}" when first name is "${firstName}", last name is "${lastName}", and postal code is "${postalCode}"`, async () => {
            await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
            await checkoutPage.clickContinueButton();

            const errorLocator = await checkoutPage.getErrorMessage();
            await expect(errorLocator).toBeVisible();
            await expect(errorLocator).toHaveText(errorMessage);
        });
    });

    test('should dismiss error message when clicking the error button', async () => {
        await checkoutPage.fillCheckoutInformation('', '', '');
        await checkoutPage.clickContinueButton();

        const errorLocator = await checkoutPage.getErrorMessage();
        await expect(errorLocator).toBeVisible();

        const errorButton = await checkoutPage.getErrorButton();
        await errorButton.click();

        await expect(errorLocator).toBeHidden();
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