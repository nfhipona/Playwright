import { test, expect } from '@playwright/test';
import CartPage from '../components/saucedemo/CartPage';

test.describe('Cart Page', () => {
    let cartPage: CartPage;
    const inventoryURLPattern: RegExp = /.*inventory.*/;
    const cartPageURLPattern: RegExp = /.*cart.html/;
    const productDetailsURLPattern: RegExp = /.*inventory-item.html\?id=\d+.*/;
    const validUsername: string = 'standard_user';
    const validPassword: string = 'secret_sauce';
    const productNames: string[] = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
    ];

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        await cartPage.load();
        await cartPage.login(validUsername, validPassword);
        await cartPage.waitForURL(inventoryURLPattern);
    });

    test('should add a product to the cart and verify that the cart badge got updated', async () => {
        for (const productName of productNames) { 
            await cartPage.addToCartByName(productName);
        }

        const cartButton = await cartPage.getCartButton();
        await expect(cartButton).toHaveText(productNames.length.toString());
    });

    test('should be able to view the product details', async () => {
        for (const productName of productNames) { 
            await cartPage.addToCartByName(productName);
        }
        await cartPage.navigateToCart();
        await cartPage.waitForURL(cartPageURLPattern);

        const cartItems = await cartPage.getCartItems();
        const productLink = cartItems.filter({ hasText: productNames[0] }).locator('.inventory_item_name');
        await productLink.click();
        await cartPage.waitForURL(productDetailsURLPattern);
        
        const pageURL = cartPage.getPageURL();
        expect(pageURL).toMatch(productDetailsURLPattern);

        // Verify the product details page is displayed
        const productTitle = cartPage.getByText(productNames[0]);
        await expect(productTitle).toBeVisible();
    });

    test('should add a product to the cart and verify it appears in the cart item lists', async () => {
        for (const productName of productNames) { 
            await cartPage.addToCartByName(productName);
        }
        await cartPage.navigateToCart();

        const cartPageURL = cartPage.getPageURL();
        expect(cartPageURL).toMatch(cartPageURLPattern);

        const cartItems = await cartPage.getCartItems();
        const itemCount = await cartItems.count();
        expect(itemCount).toBe(productNames.length);

        for (const productName of productNames) { 
            const result = cartItems.filter({ hasText: productName });
            expect(result).toBeTruthy();
        }
    });

    test('should add a product to the cart, remove some, and verify the cart badge got updated', async () => {
        for (const productName of productNames) { 
            await cartPage.addToCartByName(productName);
        }
        await cartPage.navigateToCart();

        const cartPageURL = cartPage.getPageURL();
        expect(cartPageURL).toMatch(cartPageURLPattern);

        const cartItems = await cartPage.getCartItems();
        const itemCount = await cartItems.count();
        expect(itemCount).toBe(productNames.length);

        // Remove the first 3 items
        for (let i = 0; i < 3; i++) {
            const productName = productNames[i];
            await cartPage.removeItemByName(productName);
        }

        // Verify the cart badge got updated
        const cartButton = await cartPage.getCartButton();
        await expect(cartButton).toHaveText((productNames.length - 3).toString());

        // Check the remaining items
        for (let i = 3; i < productNames.length; i++) {
            const productName = productNames[i];
            const result = cartItems.filter({ hasText: productName });
            expect(result).toBeTruthy();
        }
    });

    test('should navigate to the product listing page when clicking the continue shopping button', async () => {
        await cartPage.addToCartByName(productNames[0]);
        await cartPage.navigateToCart();

        const cartPageURL = cartPage.getPageURL();
        expect(cartPageURL).toMatch(cartPageURLPattern);

        await cartPage.backToProductPage();

        const productListURL = cartPage.getPageURL();
        expect(productListURL).toMatch(inventoryURLPattern);

        // Verify we are back on the product listing page
        const productItems = await cartPage.getProductItems();
        await expect(productItems).toHaveCount(6);
     });

     test('should navigate to the checkout page when clicking the checkout button', async () => {
        await cartPage.addToCartByName(productNames[0]);
        await cartPage.navigateToCart();

        const cartPageURL = cartPage.getPageURL();
        expect(cartPageURL).toMatch(cartPageURLPattern);

        await cartPage.goToCheckoutPage();

        const checkoutPageURL = cartPage.getPageURL();
        expect(checkoutPageURL).toMatch(/.*checkout-step-one.*/);
     });
});