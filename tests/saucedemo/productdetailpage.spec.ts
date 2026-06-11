import { test, expect } from '@playwright/test';
import ProductDetailPage from '../components/saucedemo/ProductDetailPage';

test.describe('Product Detail Page', () => {
    let productDetailPage: ProductDetailPage;
    const validUsername: string = 'standard_user';
    const validPassword: string = 'secret_sauce';

    test.beforeEach(async ({ page }) => {
        productDetailPage = new ProductDetailPage(page);
        await productDetailPage.load();
        await productDetailPage.login(validUsername, validPassword);
        await productDetailPage.waitForURL(/.*inventory.*/);
    });

    [
        {
            productName: 'Sauce Labs Fleece Jacket',
            productPrice: '$49.99'
        },
        {
            productName: 'Sauce Labs Bolt T-Shirt',
            productPrice: '$15.99'
        },
        {
            productName: 'Sauce Labs Backpack',
            productPrice: '$29.99'
        },
    ].forEach(({ productName, productPrice }) => {
        test(`should navigate to product detail page and display correct information for ${productName}`, async () => {
            await productDetailPage.navigateToProductDetail(productName);

            const title = await productDetailPage.getProductTitle();
            await expect(title).toHaveText(productName);

            const price = await productDetailPage.getProductPrice();
            await expect(price).toHaveText(productPrice);
        });
    });

    test('should add a product to the cart from the product detail page and then remove it', async () => {
        const productName: string = 'Sauce Labs Fleece Jacket';
        await productDetailPage.navigateToProductDetail(productName);

        // Add to cart
        await productDetailPage.addToCart();
        const cartButton = await productDetailPage.getCartButton();
        await expect(cartButton).toHaveText('1'); // Assuming the cart button shows the number of items

        // Remove from cart
        await productDetailPage.removeFromCart();
        await expect(cartButton).toHaveText(''); // Assuming the cart button is empty when no items are in the cart
     });
});