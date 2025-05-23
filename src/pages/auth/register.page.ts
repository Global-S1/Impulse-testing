// src/pages/RegisterPage.ts
import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly gender: Locator;
    readonly dni: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly country: Locator;
    readonly city: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('input[name="firstName"]');
        this.lastName = page.locator('input[name="lastName"]');
        this.gender = page.locator('select[name="sex"]');
        this.dni = page.locator('input[name="identification"]');
        this.email = page.locator('input[name="email"]');
        this.phone = page.locator('input[name="mobile"]');
        this.country = page.locator('select[name="countryId"]');
        this.city = page.locator('input[name="city"]');
        this.submitButton = page.locator('.register-form_btn__Tn_Qk');
    }

    async goto(pageUrl: string = '/r/register') {
        await this.page.goto(pageUrl);
    }

    async fillForm({
        firstName,
        lastName,
        gender,
        dni,
        email,
        phone,
        country,
        city,
    }: {
        firstName: string;
        lastName: string;
        gender: string;
        dni: string;
        email: string;
        phone: string;
        country: string;
        city: string;
    }) {
        await this.firstName.waitFor({ state: 'visible' });
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.gender.selectOption({ label: gender });
        await this.dni.fill(dni);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.country.selectOption({ label: country });
        await this.city.fill(city);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectSuccessMessage() {
        const keywords = [
            'Welcome',
            'registration has been successful',
        ];

        const body = this.page.locator('body');
        let found = false;
        for (const word of keywords) {
            try {
                await expect(body.locator(`:text-matches("${word}", "i")`).first()).toBeVisible({ timeout: 10000 });
                found = true;
                break;
            } catch (e) {
                // Si no aparece, sigue con la siguiente palabra
            }
        }
        if (!found) {
            throw new Error('No se encontró el mensaje de éxito tras el registro');
        }
        const loginButton = this.page.locator('button, a', { hasText: /login|iniciar sesión/i });
        await expect(loginButton.first()).toBeVisible({ timeout: 10000 });
    }
}