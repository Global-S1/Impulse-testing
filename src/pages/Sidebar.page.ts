import { Page, Locator } from '@playwright/test';

export class SidebarPage {
    readonly page: Page;
    readonly ordersLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersLink = this.page.getByRole('link')
    }

    async clickOrdersLink() {
      const keywords = [
            'Orders',
            'Órdenes',
        ];
        for (const keyword of keywords) {
            const link = this.ordersLink.filter({ hasText: keyword });
            if (await link.isVisible()) {
                await link.click();
                return;
            }
        }
    }
}