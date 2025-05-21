import { Page, Locator, expect } from '@playwright/test';
import { typeProduct } from '../../enums/TypeProducts';

export class OrdersPage {
  readonly page: Page;
  readonly btnNewChallenge: Locator;
  readonly inputChallenge: Locator;
  readonly inputTournament: Locator;
  readonly inputONEPhase: Locator;
  readonly inputTWOPhase: Locator;
  readonly fundingAmountOption: (amount: string) => Locator;
  readonly setProfitTarget: (profitTarget: string) => Locator;
  readonly setDurationPhase1: (duration: string) => Locator;
  readonly setPlatform: (Platform: string) => Locator;
  readonly setExtension: (extension: string) => Locator;
  readonly btnContinue: Locator;

  readonly checkboxAcceptTerms: Locator;
  readonly checkboxAcceptCancelation: Locator;
  readonly btnPay: Locator;

  readonly setPayMethod: (extension: string) => Locator;
  readonly btnProcessorSite: Locator;

  readonly inputEmail: Locator;
  readonly cardInfo: Locator;
  readonly cardExpiry: Locator;
  readonly cardCvc: Locator;
  readonly billingName: Locator;
  readonly billingCountry: Locator;
  readonly submitBtnWallet: Locator;

  readonly btnAppTrader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnNewChallenge = page.locator('.navbar_component_challenge__5aIjx');
    this.inputChallenge = page.locator('label[for="CHALLENGE"]');
    this.inputTournament = page.locator('label[for="TOURNAMENT"]');
    this.inputONEPhase = page.locator('label[for="ONE"]');
    this.inputTWOPhase = page.locator('label[for="TWO"]');
    this.fundingAmountOption = (amount: string) => this.page.locator(`label[for="${amount}"]`);
    this.setProfitTarget = (profitTarget: string) => this.page.locator(`label[for="${profitTarget}"]`);
    this.setDurationPhase1 = (duration: string) => this.page.locator(`label[for="FASE1${duration}"]`);
    this.setPlatform = (Platform: string) => this.page.locator(`label[for="${Platform}"]`);
    this.setExtension = (extension: string) => this.page.locator(`label >> input[id="${extension}"]`);
    this.btnContinue = this.page.locator('.button-continue');

    this.checkboxAcceptTerms = page.locator('#acceptTerms');
    this.checkboxAcceptCancelation = page.locator('#acceptCancelation');
    this.btnPay = page.locator('.button--orange');

    this.setPayMethod = (payMethod: string) => this.page.locator(`label[for="${payMethod}"]`);
    this.btnProcessorSite = this.page.locator('.button--external-pay');

    this.inputEmail = this.page.locator('#email');
    this.cardInfo = this.page.locator('#cardNumber');
    this.cardExpiry = this.page.locator('#cardExpiry');
    this.cardCvc = this.page.locator('#cardCvc');
    this.billingName = this.page.locator('#billingName');
    this.billingCountry = this.page.locator('#billingCountry');
    this.submitBtnWallet = this.page.locator('.SubmitButton-Text', { hasText: 'Pay' });
    this.btnAppTrader = this.page.locator('.app-trader-button');
  }

  async clickBtnNewChallenge(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.btnNewChallenge.click(),             
    ]);
    await newPage.waitForLoadState(); 
    return newPage;
  }

  async selectTypeProduct(typeProduct: typeProduct) {
    switch(typeProduct) {
      case 'CHALLENGE':
        await this.inputChallenge.click();
        break;
      case 'TOURNAMENT':
        await this.inputTournament.click();
        break;
      default:
        throw new Error(`Tipo de producto no válido: ${typeProduct}`);
    }
  }

  async selectNumberOfPhases( numberOfPhases: number){
    switch(numberOfPhases){
      case 1: 
        await this.inputONEPhase.click();
        break;
      case 2:
        await this.inputTWOPhase.click();
        break;
      default:
        throw new Error(`Solo puede escoger 1 a 2 fases`);
    }
  }

  async selectFundingAmount(amount: string) {
    const option = this.fundingAmountOption(amount);
    await option.click();
  }

  async selectProfitTarget(proftiTarget: string) {
    const option = this.setProfitTarget(proftiTarget);
    await option.click();
  }

  async selectDurationPhase1(duration: string) {
    const option = this.setDurationPhase1(duration);
    await option.click();
  }

  async selectPlatform(platform: string) {
    const option = this.setPlatform(platform);
    await option.click();
  }

  async selectExtension(extension: string) {
    const option = this.setExtension(extension);
    await option.click();
  }

  // navegacion en la misma pagina 
  async clickBtnContinue(): Promise<void> {
    await Promise.all([
      this.page.waitForSelector('#acceptTerms'),
      this.btnContinue.click()
    ]);
  }

  async completeOrderFlow() {
    await this.checkboxAcceptTerms.check();
    await this.checkboxAcceptCancelation.check();
    await this.btnPay.click();
  }

  async selectPayMethod(PayMethod: string) {
    const option = this.setPayMethod(PayMethod);
    await option.click();
  }

  async clickBtnProcessorSite(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.btnProcessorSite.click(),             
    ]);
    await newPage.waitForLoadState(); 
    return newPage;
  }

  async fillFormPay({
    email,
    cardNumber,
    cardExpiry,
    cardCvc,
    billingName,
    billingCountry
  }: {
    email: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    billingName: string;
    billingCountry: string;
  }) {
    await this.inputEmail.fill(email);
    await this.cardInfo.fill(cardNumber);
    await this.cardExpiry.fill(cardExpiry);
    await this.cardCvc.fill(cardCvc);
    await this.billingName.fill(billingName);
    await this.billingCountry.selectOption({ label: billingCountry });
  }

  async submitPayment() {
    await this.submitBtnWallet.click();
  }

  async returnAppTrader(){
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.btnAppTrader.click(),             
    ]);
    await newPage.waitForLoadState(); 
    return newPage;

  }
}