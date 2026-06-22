import { test, expect } from '@playwright/test';
import DragDrop from '../components/saucedemo/DragDrop';

test.describe('Drag and Drop Functionality', () => {
    let dragDrop: DragDrop;

    test.beforeEach(async ({ page }) => {
        dragDrop = new DragDrop(page);
        await dragDrop.load();
    });

    test('should perform drag and drop', async () => {
        await dragDrop.performDebitDragDropUpdate();
        await dragDrop.performCreditDragDropUpdate();

        const perfectButton = await dragDrop.getPerfectButton();
        await expect(perfectButton).toBeVisible();
        await expect(perfectButton).toHaveText('Perfect!');
    });
});