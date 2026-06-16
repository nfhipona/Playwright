import { Locator } from '@playwright/test';
import CartPage from "./CartPage";

class CheckoutPage extends CartPage {
    protected readonly checkoutStepOneURLPattern: RegExp = /.*checkout-step-one.html/;
    protected readonly cartURLPattern: RegExp = /.*cart.html/;
    protected readonly validUsername: string = 'standard_user';
    protected readonly validPassword: string = 'secret_sauce';
    protected readonly productNames: string[] = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
    ];
    
    async prepareCheckoutPage(): Promise<void> {
        await this.login(this.validUsername, this.validPassword);
        await this.waitForURL(/.*inventory.*/);

        // Add products to the cart
        for (const productName of this.productNames) { 
            await this.addToCartByName(productName);
        }
        
        // Go to cart page
        await this.navigateToCart();
        await this.waitForURL(this.cartURLPattern);

        // Go to checkout page
        await this.goToCheckoutPage();
        await this.waitForURL(this.checkoutStepOneURLPattern);
    }

    async getCheckoutTitle(): Promise<Locator> {
        return this.locateBy('.title');
    }

    async firstNameInput(): Promise<Locator> {
        return this.locateBy('#first-name');
    }

    async lastNameInput(): Promise<Locator> {
        return this.locateBy('#last-name');
    }

    async postalCodeInput(): Promise<Locator> {
        return this.locateBy('#postal-code');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        const firstNameInput = await this.firstNameInput();
        const lastNameInput = await this.lastNameInput();
        const postalCodeInput = await this.postalCodeInput();

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await postalCodeInput.fill(postalCode);
    }

    async getErrorMessageContainer(): Promise<Locator> {
        return this.locateBy('.error-message-container');
    }

    async getErrorMessage(): Promise<Locator> {
        return this.locateBy('[data-test="error"]');
    }

    async getErrorButton(): Promise<Locator> {
        return this.locateBy('.error-button');
    }

    async getContinueButton(): Promise<Locator> {
        return this.page.getByRole('button', { name: 'Continue' });
    }

    async clickContinueButton(): Promise<void> {
        const continueButton = await this.getContinueButton();
        await continueButton.click();
        await this.waitForURL(/.*checkout-step-two.html/);
    }

    async clickCancelButton(): Promise<void> {
        const cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        await cancelButton.click();
        await this.waitForURL(this.cartURLPattern);
    }
}

export default CheckoutPage;