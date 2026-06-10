import { Locator } from '@playwright/test';
import LoginPage from "./LoginPage";

class CartPage extends LoginPage {
    protected readonly cartURL: string = `${this.baseURL}/cart.html`; // https://www.saucedemo.com/cart.html
    protected readonly productURL: string = `${this.baseURL}/inventory.html`; // https://www.saucedemo.com/inventory.html
    protected readonly checkoutURL: string = `${this.baseURL}/checkout-step-one.html`; // https://www.saucedemo.com/checkout-step-one.html

    async navigateToCart(): Promise<void> {
        const cartButton = await this.locateBy('.shopping_cart_link');
        await cartButton.click();
        await this.waitForURL(this.cartURL);
    }

    async navigateToProduct(): Promise<void> {
        const productButton = await this.locateBy('#continue-shopping');
        await productButton.click();
        await this.waitForURL(this.productURL);
    }

    async navigateToCheckout(): Promise<void> {
        const checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
        await checkoutButton.click();
        await this.waitForURL(this.checkoutURL);
    }

    async getCartLists(): Promise<Locator> {
        return this.locateBy('.cart_list');
    }

    async getCartItems(): Promise<Locator> {
        return this.locateBy('.cart_item');
    }
}

export default CartPage;