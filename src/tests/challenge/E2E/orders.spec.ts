import { test } from '@playwright/test';
import { OrdersPage } from '../../../pages/challenge/orders.page';
import { registerAndLogin } from '../../../helpers/auth-flow';
import { validUser } from '../../../data/users';
import { validPaymentData } from '../../../data/payment';
import { SidebarPage } from '../../../pages/Sidebar.page';

//test.use({ storageState: 'src/setup/sessions/storageState.chromium.json' });
test('Compra de un desafío', async ({ page }) => {
    //await registerAndLogin(page, validUser.newPasword);

    await page.goto('/');
    const ordersPage = new OrdersPage(page);
    const ConfigurePage = await ordersPage.clickBtnNewChallenge();
    const challengeConfigurePage = new OrdersPage(ConfigurePage);
    await challengeConfigurePage.selectTypeProduct('CHALLENGE');
    await challengeConfigurePage.selectNumberOfPhases(2);
    await challengeConfigurePage.selectFundingAmount('10000');
    await challengeConfigurePage.selectProfitTarget('10');
    await challengeConfigurePage.selectDurationPhase1('60');
    await challengeConfigurePage.selectPlatform('TRADELOCKER');
    //await challengeConfigurePage.selectExtension('EXTENSION_30'); //EXTENSION_15 
    await challengeConfigurePage.clickBtnContinue();
    await challengeConfigurePage.completeOrderFlow();

    await challengeConfigurePage.selectPayMethod('STRIPE');
    const PayPage = await challengeConfigurePage.clickBtnProcessorSite();
    const challengePayPage = new OrdersPage(PayPage);

    await challengePayPage.fillFormPay(validPaymentData);

    await challengePayPage.submitPayment();
    const AppTrader = await challengePayPage.returnAppTrader();
    
    const homeAppTrader = new SidebarPage(AppTrader);
    await homeAppTrader.clickOrdersLink();
});