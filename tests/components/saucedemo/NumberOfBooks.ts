import { Page, Locator } from '@playwright/test';

class NumberOfBooks {
    private page: Page;
    protected readonly baseURL: string = 'https://www.booksbykilo.in/new-books?pricerange=201to500';

    constructor(page: Page) {
        this.page = page;
    }

    async load(): Promise<void> {
        await this.page.goto(this.baseURL);
        await this.page.waitForLoadState('load');
    }

    async scrollToEndOfPage(): Promise<void> {
        const browserType = this.page.context().browser()?.browserType().name();
        let previousHeight = 0;

        while (true) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // Scroll to the bottom
            if (browserType === 'webkit') {
                await this.page.keyboard.press('Meta+ArrowDown'); // Since scroll to seems to fail for safari
            }
            await this.page.waitForTimeout(2000); // Wait for new content to load

            if (browserType === 'webkit') {
                const listOfBooks = await this.getListOfBooks();
                const bookCount = await listOfBooks.count();
                //console.log(`Current number of books loaded: ${bookCount}`);
                if (bookCount >= 1576) {
                    break;
                }
            } else {
                const currentHeight = await this.page.evaluate(() => document.body.scrollHeight);
                if (currentHeight === previousHeight) {
                    break; // End of page reached
                }
                previousHeight = currentHeight;
            }
        }
    }

    async getListOfBooks(): Promise<Locator> {
        const listOfBooks = this.page.locator('#productsDiv div');
        return listOfBooks;
    }

    async getLastBookTitle(): Promise<string> {
        const listOfBooks = await this.getListOfBooks();
        const lastBook = listOfBooks.locator('h3').last(); // Total items: 1576
        return await lastBook.textContent() || ''; // Rishi Sunak: The Rise
    }
}

export default NumberOfBooks;