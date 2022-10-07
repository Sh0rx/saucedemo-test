const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class CheckoutPage extends BasePage {
    
    constructor() {
        super();
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.id('last-name');
        this.postalCodeInput = By.id('postal-code');
        this.continueButton = By.name('continue');
    }

    async completeForm(firstName, lastName, postalCode) {
        await driver.findElement(this.firstNameInput).sendKeys(firstName);
        await driver.findElement(this.lastNameInput).sendKeys(lastName);
        await driver.findElement(this.postalCodeInput).sendKeys(postalCode);
    }

    async clickContinueButton() {
        await driver.findElement(this.continueButton).click();
    }

}

module.exports = new CheckoutPage();