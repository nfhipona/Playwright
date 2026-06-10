import { Locator } from '@playwright/test';
import LoginPage from "./LoginPage";

class ProductPage extends LoginPage {
    async getProductLists(): Promise<Locator> {
        return this.locateBy('.inventory_list');
    }

    async getProductItems(): Promise<Locator> {
        return this.locateBy('.inventory_item');
    }

    async addToCartByName(productName: string): Promise<void> {
        const items = await this.getProductItems();
        const addToCartButton = items.filter({ hasText: productName }).locator('button', { hasText: 'Add to cart' });
        await addToCartButton.click();
    }

    async removeFromCartByName(productName: string): Promise<void> {
        const items = await this.getProductItems();
        const removeFromCartButton = items.filter({ hasText: productName }).locator('button', { hasText: 'Remove' });
        await removeFromCartButton.click();
    }

    async getCartButton(): Promise<Locator> {
        return this.locateBy('.shopping_cart_link');
    }

    async getSortDropdown(): Promise<Locator> {
        return this.locateBy('.product_sort_container');
    }

    async sortProductsBy(option: string): Promise<void> {
        const sortDropdown = await this.getSortDropdown();
        await sortDropdown.selectOption(option);
    }
}

export default ProductPage;