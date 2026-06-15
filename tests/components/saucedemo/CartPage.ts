import { Locator } from '@playwright/test';
import LoginPage from "./LoginPage";

class CartPage extends LoginPage {
    protected readonly cartURL: string = `${this.baseURL}/cart.html`; // https://www.saucedemo.com/cart.html
    protected readonly productURL: string = `${this.baseURL}/inventory.html`; // https://www.saucedemo.com/inventory.html
    protected readonly checkoutURL: string = `${this.baseURL}/checkout-step-one.html`; // https://www.saucedemo.com/checkout-step-one.html

    async getProductItems(): Promise<Locator> {
        return this.locateBy('.inventory_item');
    }

    async addToCartByName(productName: string): Promise<void> {
        const items = await this.getProductItems();
        const addToCartButton = items.filter({ hasText: productName }).locator('button', { hasText: 'Add to cart' });
        await addToCartButton.click();
    }

    async getCartButton(): Promise<Locator> {
        return this.locateBy('.shopping_cart_link');
    }

    async navigateToCart(): Promise<void> {
        const cartButton = await this.getCartButton();
        await cartButton.click();
        await this.waitForURL(this.cartURL);
    }

    async getCartLists(): Promise<Locator> {
        return this.locateBy('.cart_list');
    }

    async getCartItems(): Promise<Locator> {
        return this.locateBy('.cart_item');
    }

    async clickProductByName(productName: string): Promise<void> {
        const items = await this.getCartItems();
        const productLink = items.filter({ hasText: productName }).locator('.inventory_item_name');
        await productLink.click();
        await this.waitForURL(/.*inventory-item.html\?id=\d+.*/);
    }

    async removeItemByName(productName: string): Promise<void> {
        const items = await this.getCartItems();
        const removeButton = items.filter({ hasText: productName }).locator('button', { hasText: 'Remove' });
        await removeButton.click();
    }

    async backToProductPage(): Promise<void> {
        const productButton = await this.locateBy('#continue-shopping');
        await productButton.click();
        await this.waitForURL(this.productURL);
    }

    async goToCheckoutPage(): Promise<void> {
        const checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
        await checkoutButton.click();
        await this.waitForURL(this.checkoutURL);
    }
}

export default CartPage;