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

    async scrollToEndOfPage(browserName: String = "unknown"): Promise<void> {
        let previousHeight = 0;

        while (true) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // Scroll to the bottom
            if (browserName === 'webkit') {
                await this.page.keyboard.press('Meta+ArrowDown'); // Since scroll to seems to fail for safari
            }
            await this.page.waitForTimeout(2000); // Wait for new content to load

            const listOfBooks = await this.getListOfBooks();
            const bookCount = await listOfBooks.count();
            console.log(`Browser: ${browserName} -- Current number of books loaded: ${bookCount}`);
            
            if (browserName === 'webkit') {
                if (bookCount >= 1500) { // Expecting more than 1500 books to be loaded
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