import { test } from '@playwright/test';
import { OrdersPage } from '../../../pages/challenge/orders.page';
import { registerAndLogin } from '../../../helpers/auth-flow';
import { validUser } from '../../../data/users';
import { validPaymentData } from '../../../data/payment';
import { SidebarPage } from '../../../pages/Sidebar.page';
import { typeProduct } from '../../../enums/TypeProducts';

test('Compra de un desafío', async ({ page }) => {
    await registerAndLogin(page, validUser.newPasword);

    const ordersPage = new OrdersPage(page);
    const ConfigurePage = await ordersPage.clickBtnNewChallenge();
    const challengeConfigurePage = new OrdersPage(ConfigurePage);
    await challengeConfigurePage.selectTypeProduct(process.env.CHALLENGE_TYPE_PRODUCT as typeProduct);
    await challengeConfigurePage.selectNumberOfPhases(Number(process.env.CHALLENGE_NUMBER_OF_PHASES));
    await challengeConfigurePage.selectFundingAmount(process.env.CHALLENGE_FUNDING_AMOUNT as string);
    await challengeConfigurePage.selectProfitTarget(process.env.CHALLENGE_PROFIT_TARGET as string);
    await challengeConfigurePage.selectDurationPhase1(process.env.CHALLENGE_DURATION_PHASE1 as string);
    await challengeConfigurePage.selectPlatform(process.env.CHALLENGE_PLATFORM as string); 
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