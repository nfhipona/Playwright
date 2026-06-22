import { Page, Locator } from '@playwright/test';

class DragDrop {
    private page: Page;
    protected readonly baseURL: string = 'https://demo.guru99.com/test/drag_drop.html';

    constructor(page: Page) {
        this.page = page;
    }

    async load(): Promise<void> {
        await this.page.goto(this.baseURL);
        await this.page.waitForLoadState('load');
    }

    async performDragAndDrop(source: Locator, target: Locator): Promise<void> {
        /*
        // Approach 1: Using mouse events to perform drag and drop
        await source.hover();
        await this.page.mouse.down();
        await target.hover();
        await this.page.mouse.up();
        */

        // Approach 2: Using the built-in dragTo method
        await source.dragTo(target);
    }

    async getPerfectButton(): Promise<Locator> {
        return this.page.locator('.table4_result a');
    }

    async performDebitDragDropUpdate(): Promise<void> {
        const bankSource = this.page.locator('#credit2');
        const bankTarget = this.page.locator('#bank');
        await this.performDragAndDrop(bankSource, bankTarget);

        const amountSource = this.page.locator('#fourth').first();
        const amountTarget = this.page.locator('#amt7');
        await this.performDragAndDrop(amountSource, amountTarget);
    }

    async performCreditDragDropUpdate(): Promise<void> {
        const loanSource = this.page.locator('#credit1');
        const loanTarget = this.page.locator('#loan');
        await this.performDragAndDrop(loanSource, loanTarget);

        const amountSource = this.page.locator('#fourth').last();
        const amountTarget = this.page.locator('#amt8');
        await this.performDragAndDrop(amountSource, amountTarget);
    }
}

export default DragDrop;