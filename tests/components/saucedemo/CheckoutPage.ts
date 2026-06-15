import { Locator } from '@playwright/test';
import CartPage from "./CartPage";

class CheckoutPage extends CartPage {
    protected readonly checkoutStepTwoURLPattern: RegExp = /.*checkout-step-two.html/;
    protected readonly cartURLPattern: RegExp = /.*cart.html/;

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

    async clickContinueButton(): Promise<void> {
        const continueButton = this.page.getByRole('button', { name: 'Continue' });
        await continueButton.click();
        await this.waitForURL(this.checkoutStepTwoURLPattern);
    }

    async clickCancelButton(): Promise<void> {
        const cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        await cancelButton.click();
        await this.waitForURL(this.cartURLPattern);
    }
}

export default CheckoutPage;