import { test, expect } from '@playwright/test';
import { InboxKittenPage } from '../../../external-services/inbox-kitten.page';
import { RegisterPage } from '../../../pages/auth/register.page';
import { LoginPage } from '../../../pages/auth/login.page';
import { ChangePasswordPage } from '../../../pages/auth/change-password.page';
import { validUser } from '../../../data/users';


//test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Flujo de autenticación', () => {
    test('Registro exitoso', async ({ page }) => {
        const inboxKitten = new InboxKittenPage(page);
        const email = await inboxKitten.openAndGetEmail();
        validUser.email = email;

        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        await registerPage.fillForm(validUser);
        await registerPage.submit();
        await page.waitForTimeout(2000);
        await registerPage.expectSuccessMessage();
        await page.waitForTimeout(2000);
        await inboxKitten.gotoInbox(validUser.email);
        await inboxKitten.openRegistrationEmail('Registro de Usuario');
        const password = await inboxKitten.getUserAndPasswordFromEmail(validUser.email);
        validUser.password = password;
    });

    test('Login exitoso', async ({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.email, validUser.password);

        const changePasswordPage = new ChangePasswordPage(page);
        await changePasswordPage.changePassword(validUser.password, validUser.newPasword);
        await page.waitForTimeout(2000);
        await loginPage.login(validUser.email, validUser.newPasword);
    })
});

