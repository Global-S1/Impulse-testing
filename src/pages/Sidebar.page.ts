import { Page, Locator } from '@playwright/test';

export class SidebarPage {
    readonly page: Page;
    readonly ordersLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersLink = this.page.getByRole('link').filter({ hasText: 'Orders' });
    }

    async clickOrdersLink() {
      await this.ordersLink.click();
    }
}