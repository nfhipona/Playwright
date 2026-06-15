import { test, expect } from '@playwright/test';
import CheckoutPage2 from '../components/saucedemo/CheckoutPage2';

test.describe('Checkout Page Step Two', () => {
    let checkoutPage2: CheckoutPage2;
    const inventoryURLPattern: RegExp = /.*inventory.html/;
    const checkoutStepTwoURLPattern: RegExp = /.*checkout-step-two.html/;
    const checkoutCompleteURLPattern: RegExp = /.*checkout-complete.html/;
    const productDetailsURLPattern: RegExp = /.*inventory-item.html\?id=\d+.*/;
    const productNames: string[] = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
    ];

    test.beforeEach(async ({ page }) => {
        checkoutPage2 = new CheckoutPage2(page);
        await checkoutPage2.load();
        await checkoutPage2.prepareCheckoutPage();
    });

    test('should be able to view the product details', async () => {
        const cartItems = await checkoutPage2.getCartItems();
        const productLink = cartItems.filter({ hasText: productNames[0] }).locator('.inventory_item_name');
        await productLink.click();
        await checkoutPage2.waitForURL(productDetailsURLPattern);

        const pageURL = checkoutPage2.getPageURL();
        expect(pageURL).toMatch(productDetailsURLPattern);

        // Verify the product details page is displayed
        const productTitle = checkoutPage2.getByText(productNames[0]);
        await expect(productTitle).toBeVisible();
    });

    test('should display the correct checkout information title and in correct URL', async () => {
        const checkoutTitle = await checkoutPage2.getCheckoutTitle();
        await expect(checkoutTitle).toHaveText('Checkout: Overview');

        const pageURL = checkoutPage2.getPageURL();
        expect(pageURL).toMatch(checkoutStepTwoURLPattern);
    });

    test('should display the correct subtotal price and in correct URL', async () => {
        const pageURL = checkoutPage2.getPageURL();
        expect(pageURL).toMatch(checkoutStepTwoURLPattern);

        // Extract prices and verify sorting
        const cartItems = await checkoutPage2.getCartItems();
        const prices = await cartItems.locator('.inventory_item_price').allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
        const totalPrice = numericPrices.reduce((sum, price) => sum + price, 0);

        const subTotalItemPrice = await checkoutPage2.getSubTotalItemPrice();
        const priceText = await subTotalItemPrice.textContent();
        const subTotalPriceText = priceText ? priceText : '';
        const subTotalPrice = parseFloat(subTotalPriceText.replace('Item total: $', ''));

        // Compare the calculated total price with the displayed subtotal price
        expect(subTotalPrice).toEqual(totalPrice);
    });

    test('should finish the checkout process and navigate to the complete page', async () => {
        await checkoutPage2.clickFinishButton();

        const pageURL = checkoutPage2.getPageURL();
        expect(pageURL).toMatch(checkoutCompleteURLPattern);
    });

    test('should cancel the checkout process and return to the product page', async () => {
        await checkoutPage2.clickCancelButton();

        const pageURL = checkoutPage2.getPageURL();
        expect(pageURL).toMatch(inventoryURLPattern);
    });
});