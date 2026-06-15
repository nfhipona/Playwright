import { Locator } from '@playwright/test';
import CheckoutPage from "./CheckoutPage";

class CheckoutPage2 extends CheckoutPage {
    async getSubTotalItemPrice(): Promise<Locator> {
        return this.locateBy('.summary_subtotal_label');
    }

    // Override the clickCancelButton to navigate back to the product page instead of cart page
    async clickCancelButton(): Promise<void> {
        const cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        await cancelButton.click();
        await this.waitForURL(this.productURL);
    }

    // Override the clickContinueButton to click the Finish button instead of continue from checkout step one
    async clickContinueButton(): Promise<void> {
        const finishButton = this.page.getByRole('button', { name: 'Finish' });
        await finishButton.click();
        await this.waitForURL(/.*checkout-complete.html/);
    }
}

export default CheckoutPage2;