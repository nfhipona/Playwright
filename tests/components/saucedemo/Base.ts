import { Page, Locator } from '@playwright/test';

abstract class Base {
  protected page: Page;
  protected readonly baseURL: string = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async load(): Promise<void> {
    await this.page.goto(this.baseURL);
    await this.waitForURL(this.baseURL); // Ensure the page has fully loaded
  }

  async locateBy(identifier: any): Promise<Locator> {
    return this.page.locator(identifier);
  }

  async waitForURL(url: any): Promise<void> {
    await this.page.waitForURL(url);
  }
}

export default Base;