import { Page } from '@playwright/test';

class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to open a URL
  async open(url = 'https://posit.cloud/') {
    await this.page.goto(url);
  }
}

export default BasePage;
