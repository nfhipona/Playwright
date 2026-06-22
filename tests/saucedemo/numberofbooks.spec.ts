import { test, expect } from '@playwright/test';
import NumberOfBooks from '../components/saucedemo/NumberOfBooks';

test.describe('Number of Books on the Page', () => {
    let numberOfBooks: NumberOfBooks;

    test.beforeEach(async ({ page }) => {
        numberOfBooks = new NumberOfBooks(page);
        await numberOfBooks.load();
    });

    test('should load all books and verify the last book title', async () => {
        test.slow(); // Marking the test as slow due to potential long loading times
        await numberOfBooks.scrollToEndOfPage();

        const listOfBooks = await numberOfBooks.getListOfBooks();
        const bookCount = await listOfBooks.count();
        expect(bookCount).toBeGreaterThan(1500); // Expecting more than 1500 books to be loaded

        const lastBookTitle = await numberOfBooks.getLastBookTitle();
        expect(lastBookTitle).toBe('Rishi Sunak: The Rise');
    });
});