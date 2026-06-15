import { Locator } from '@playwright/test';
import CheckoutPage2 from "./CheckoutPage2";

class CheckoutCompletePage extends CheckoutPage2 {
    protected readonly inventoryURLPattern: RegExp = /.*inventory.html/;
    protected readonly cartURLPattern: RegExp = /.*cart.html/;
    protected readonly checkoutStepOneURLPattern: RegExp = /.*checkout-step-one.html/;
    protected readonly checkoutStepTwoURLPattern: RegExp = /.*checkout-step-two.html/;
    protected readonly checkoutCompleteURLPattern: RegExp = /.*checkout-complete.html/;
    protected readonly validUsername: string = 'standard_user';
    protected readonly validPassword: string = 'secret_sauce';
    protected readonly firstName: string = 'eNeF';
    protected readonly lastName: string = 'Swag';
    protected readonly postalCode: string = '4031';
    protected readonly productNames: string[] = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)',
    ];

    async prepareCheckoutPage(): Promise<void> {
        await super.prepareCheckoutPage(); // Call the prepareCheckoutPage method from the parent class to set up the checkout page

        // Click finish button to complete the checkout process
        await this.clickFinishButton();
    }

    async getCheckoutLogo(): Promise<Locator> {
        return this.page.getByAltText('Pony Express');
    }

    async getCheckoutCompleteTitle(): Promise<Locator> {
        return this.locateBy('.complete-header'); // Thank you for your order!
    }

    async getCheckoutCompleteMessage(): Promise<Locator> {
        return this.locateBy('.complete-text'); // Your order has been dispatched, and will arrive just as fast as the pony can get there!
    }

    async clickBackHomeButton(): Promise<void> {
        const backHomeButton = this.page.getByRole('button', { name: 'Back Home' });
        await backHomeButton.click();
        await this.waitForURL(this.inventoryURLPattern);
    }
}

export default CheckoutCompletePage;