import { Locator } from '@playwright/test';
import CartPage from "./CartPage";

class CheckoutPage extends CartPage {
    protected readonly checkoutStepOneURL: string = `${this.baseURL}/checkout-step-one.html`; // https://www.saucedemo.com/checkout-step-one.html
    protected readonly checkoutStepTwoURL: string = `${this.baseURL}/checkout-step-two.html`; // https://www.saucedemo.com/checkout-step-two.html

    async getCheckoutTitle(): Promise<Locator> {
        return this.locateBy('.title');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        const firstNameInput = this.page.locator('#first-name');
        const lastNameInput = this.page.locator('#last-name');
        const postalCodeInput = this.page.locator('#postal-code');

        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await postalCodeInput.fill(postalCode);
    }

    async clickContinueButton(): Promise<void> {
        const continueButton = this.page.getByRole('button', { name: 'Continue' });
        await continueButton.click();
        await this.waitForURL(/.*checkout-step-two.html/);
    }

    async clickCancelButton(): Promise<void> {
        const cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        await cancelButton.click();
        await this.waitForURL(/.*cart.html/);
    }
}

export default CheckoutPage;