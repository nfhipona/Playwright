import { Locator } from '@playwright/test';
import CheckoutPage from "./CheckoutPage";

class CheckoutPage2 extends CheckoutPage {
    protected readonly firstName: string = 'eNeF';
    protected readonly lastName: string = 'Swag';
    protected readonly postalCode: string = '4031';

    async prepareCheckoutPage(): Promise<void> {
        await super.prepareCheckoutPage(); // Call the prepareCheckoutPage method from the parent class to set up the checkout page

        // Fill in checkout information and proceed to checkout step two
        await this.fillCheckoutInformation(this.firstName, this.lastName, this.postalCode);
        await this.clickContinueButton();
    }

    async getSubTotalItemPrice(): Promise<Locator> {
        return this.locateBy('.summary_subtotal_label');
    }

    // Override the clickCancelButton to navigate back to the product page instead of cart page
    async clickCancelButton(): Promise<void> {
        const cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        await cancelButton.click();
        await this.waitForURL(this.productURL);
    }

    async clickFinishButton(): Promise<void> {
        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await finishButton.click();
        await this.waitForURL(/.*checkout-complete.html/);
    }
}

export default CheckoutPage2;