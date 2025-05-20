import { test, expect } from '@playwright/test';
import { InboxKittenPage } from '../../../external-services/inbox-kitten.page';
import { RegisterPage } from '../../../pages/auth/register.page';
import { LoginPage } from '../../../pages/auth/login.page';
import { ChangePasswordPage } from '../../../pages/auth/change-password.page';
import { validUser } from '../../../data/users';

test('Registro y login exitoso', async ({ page }) => {
    const inboxKitten = new InboxKittenPage(page);
    const email = await inboxKitten.openAndGetEmail();
    validUser.email = email;

    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.fillForm(validUser);
    await registerPage.submit();
    await registerPage.expectSuccessMessage();

    await inboxKitten.gotoInbox(validUser.email);
    await inboxKitten.openRegistrationEmail('Registro de Usuario');
    const password = await inboxKitten.getUserAndPasswordFromEmail(validUser.email);
    validUser.password = password;

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);

    const changePasswordPage = new ChangePasswordPage(page);
    await changePasswordPage.changePassword(validUser.password, validUser.newPasword);

    await loginPage.login(validUser.email, validUser.newPasword);
});