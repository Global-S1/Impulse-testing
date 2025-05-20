import { BrowserContext, Page } from '@playwright/test';
import { InboxKittenPage } from '../external-services/inbox-kitten.page';
import { RegisterPage } from '../pages/auth/register.page';
import { LoginPage } from '../pages/auth/login.page';
import { ChangePasswordPage } from '../pages/auth/change-password.page';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export async function registerAndLogin(context: BrowserContext, password: string) {
  const page = await context.newPage();
  const inboxKitten = new InboxKittenPage(page);
  const email = await inboxKitten.openAndGetEmail();

  const registerPage = new RegisterPage(page);
  const baseURL = process.env.BASE_URL;
  await registerPage.goto(`${baseURL}/r/register`);
  await registerPage.fillForm({
  firstName: 'Test',
  lastName: 'User',
  gender: 'Masculino',
  dni: '12345678',
  email,
  phone: '123456789',
  country: 'Peru',
  city: 'Lima'
});
  await registerPage.submit();
  await registerPage.expectSuccessMessage();

  await inboxKitten.gotoInbox(email);
  await inboxKitten.openRegistrationEmail('Registro de Usuario');
  const tempPassword = await inboxKitten.getUserAndPasswordFromEmail(email);

  const loginPage = new LoginPage(page);
  await loginPage.goto(`${baseURL}/r/login`);
  await loginPage.login(email, tempPassword);

  const changePasswordPage = new ChangePasswordPage(page);
  await changePasswordPage.changePassword(tempPassword, password);

  await loginPage.login(email, password);

  return { email, password };
}