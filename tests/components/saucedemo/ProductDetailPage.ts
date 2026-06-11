import { Locator } from '@playwright/test';
import LoginPage from "./LoginPage";

class ProductDetailPage extends LoginPage {
    async getProductItems(): Promise<Locator> {
        return this.locateBy('.inventory_item');
    }

    async navigateToProductDetail(productName: string): Promise<void> {
        const items = await this.getProductItems();
        const productLink = items.filter({ hasText: productName }).locator('.inventory_item_name');
        await productLink.click();
        await this.waitForURL(/.*inventory-item.html\?id=\d+.*/);
    }

    async getProductTitle(): Promise<Locator> {
        return this.locateBy('.inventory_details_name');
    }

    async getProductPrice(): Promise<Locator> {
        return this.locateBy('.inventory_details_price');
    }

    async addToCart(): Promise<void> {
        const addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
        await addToCartButton.click();
    }

    async removeFromCart(): Promise<void> {
        const removeFromCartButton = this.page.getByRole('button', { name: 'Remove' });
        await removeFromCartButton.click();
    }

    async getCartButton(): Promise<Locator> {
        return this.locateBy('.shopping_cart_link');
    }

    async backToProducts(): Promise<void> {
        const backButton = this.page.getByRole('button', { name: 'Back to products' });
        await backButton.click();
        await this.waitForURL(/.*inventory.*/);
    }

    async navigatetoCart(): Promise<void> {
        const cartButton = await this.getCartButton();
        await cartButton.click();
        await this.waitForURL(/.*cart.*/);
    }
}

export default ProductDetailPage;