import { Locator, Page } from '@playwright/test';

abstract class Base {
  protected page: Page;
  protected locator: Locator;

  constructor(page: Page, locator: Locator) {
    this.page = page;
    this.locator = locator;
  }

  async load(): Promise<void> {
    await this.page.goto('http://localhost:3000/');
  }
}

export default Base;