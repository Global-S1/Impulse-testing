import { Page, Locator, expect } from '@playwright/test';

export class InboxKittenPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly btnRefresh: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.btnRefresh = page.locator('.refresh');
  }

  async openAndGetEmail() {
    await this.page.goto('https://inboxkitten.com/');
    const email = await this.emailInput.inputValue();
    const emailWithSuffix = `${email}@inboxkitten.com`;
    console.log('Email generado:', emailWithSuffix);
    
    return emailWithSuffix;
  }

  async gotoInbox(email: string) {
    const inboxName = email.split('@')[0];
    await this.page.goto(`https://inboxkitten.com/inbox/${inboxName}/list`);
  }

  async openRegistrationEmail(subject: string, maxTries = 20, interval = 3000) {
    for (let i = 0; i < maxTries; i++) {
      const emailRow = this.page.locator(`.row-subject:has-text("${subject}")`);
      if (await emailRow.count() > 0) {
        await emailRow.first().click();
        return;
      }
      // Refresca la bandeja
      await this.btnRefresh.click();
      await this.page.waitForTimeout(interval);
    }
    throw new Error(`No se encontró el correo con asunto "${subject}" después de ${maxTries} intentos.`);
  }

  
  async getUserAndPasswordFromEmail(expectedUser: string): Promise<string> {
    const emailContent = this.page.frameLocator('#message-content');
    const bodyLocator = emailContent.locator('body');
    await expect(bodyLocator).toContainText('Usuario:');
    await expect(bodyLocator).toContainText('Contraseña:');
  
    const content = await bodyLocator.innerText();

    const userMatch = content.match(/Usuario:\s*([^\s]+)/i);
    const passMatch = content.match(/Contraseña:\s*([^\s]+)/i);

    if (!userMatch || !passMatch) throw new Error('No se encontraron las credenciales en el correo');
    
    const user = userMatch[1];
    const password = passMatch[1];

    expect(user).toBe(expectedUser);
    console.log(`contraseña: ${password}`);
    return password;
  }
}