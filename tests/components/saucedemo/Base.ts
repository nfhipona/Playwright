import { Page, Locator } from '@playwright/test';

abstract class Base {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async load(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
    await this.page.waitForURL('https://www.saucedemo.com'); // Ensure the page has fully loaded
  }

  async locateBy(identifier: any): Promise<Locator> {
    return this.page.locator(identifier);
  }
}

export default Base;