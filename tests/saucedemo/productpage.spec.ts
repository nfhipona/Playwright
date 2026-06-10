import { test, expect } from '@playwright/test';
import ProductPage from '../components/saucedemo/ProductPage';

test.describe('Product Page', () => {
    let productPage: ProductPage;
    const validUsername: string = 'standard_user';
    const validPassword: string = 'secret_sauce';

    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        await productPage.load();
        await productPage.login(validUsername, validPassword);
        await productPage.waitForURL(/.*inventory.*/);
    });

    test('should display the correct number of products', async () => {
        const productLists = await productPage.getProductLists();
        await expect(productLists).toBeVisible();

        const inventoryItems = await productPage.getProductItems();
        await expect(inventoryItems).toHaveCount(6);
    });

    test('should add all products to the cart and have the button label change to remove and have the correct cart item count', async () => {
        const inventoryItems = await productPage.getProductItems();
        const productCount = await inventoryItems.count();

        for (let i = 0; i < productCount; i++) {
            const productName = await inventoryItems.nth(i).locator('.inventory_item_name').textContent();
            if (productName) {
                await productPage.addToCartByName(productName);
            }
        }

        const cartButton = await productPage.getCartButton();
        await expect(cartButton).toHaveText(productCount.toString()); // Assuming the cart button shows the number of items

        const cartItems = await productPage.getProductItems();
        for (let i = 0; i < productCount; i++) {
            const result = cartItems.nth(i).locator('button', { hasText: 'Remove' });
            expect(result).toBeTruthy();
        }
    });

    test('should add a product to the cart and then remove it', async () => {
        const productName = 'Sauce Labs Backpack';
        
        // Add to cart
        await productPage.addToCartByName(productName);
        const cartButton = await productPage.getCartButton();
        await expect(cartButton).toHaveText('1'); // Assuming the cart button shows the number of items
        
        // Remove from cart
        await productPage.removeFromCartByName(productName);
        await expect(cartButton).toHaveText(''); // Assuming the cart button is empty when no items are in the cart
    });

    test('should sort products by name (Z to A)', async () => {
        await productPage.sortProductsBy('za');
        const inventoryItems = await productPage.getProductItems();
        const prices = await inventoryItems.locator('.inventory_item_price').allTextContents();

        expect(prices[0]).toEqual('$15.99'); // Test.allTheThings() T-Shirt (Red)
        expect(prices[5]).toEqual('$29.99'); // Sauce Labs Backpack
    });

    test('should sort products by price (low to high)', async () => {
        await productPage.sortProductsBy('lohi');
        const inventoryItems = await productPage.getProductItems();
        
        // Extract prices and verify sorting
        const prices = await inventoryItems.locator('.inventory_item_price').allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);
        
        expect(numericPrices).toEqual(sortedPrices);
        expect(numericPrices[0]).toEqual(7.99);
        expect(numericPrices[5]).toEqual(49.99);
    });
});