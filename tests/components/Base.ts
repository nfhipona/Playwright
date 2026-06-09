import { Page } from '@playwright/test';

abstract class Base {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async load(): Promise<void> {
    await this.page.goto('http://localhost:3000/');
  }
}

export default Base;