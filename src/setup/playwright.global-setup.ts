import { chromium, firefox, webkit } from '@playwright/test';
import { registerAndLogin } from '../helpers/auth-flow';

export default async function globalSetup() {
  const browsers = [
    { type: chromium, statePath: 'src/setup/sessions/storageState.chromium.json' },
    //{ type: firefox, statePath: 'src/setup/sessions/storageState.firefox.json' },
    //{ type: webkit, statePath: 'src/setup/sessions/storageState.webkit.json' },
  ];

  for (const { type, statePath } of browsers) {
    console.log(`Get session for ${type.name()}`);
    const browser = await type.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await registerAndLogin(page, 'TestUserForE2E*');
    await context.storageState({ path: statePath });
    await browser.close();
  }
}