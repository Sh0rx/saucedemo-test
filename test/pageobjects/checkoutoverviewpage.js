const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class CheckoutOverviewPage extends BasePage {

    constructor() {
        super();
        this.itemTotalPriceText = By.className('summary_subtotal_label');
        this.totalPriceText = By.className('summary_total_label');
        this.taxPriceText = By.className('summary_tax_label');
    }

    async readItemTotalPrice() {
        let itemsTotalPrice = await driver.findElement(this.itemTotalPriceText).getText();
        let formattedItemsTotalPrice = parseFloat(itemsTotalPrice.substring(13));
        console.log('formattedFinalPrice: ' + formattedItemsTotalPrice);
        return formattedItemsTotalPrice;
    }

    async readTotalPrice() {
        let totalPrice = await driver.findElement(this.totalPriceText).getText();
        let formattedTotalPrice = parseFloat(totalPrice.substring(8));
        return formattedTotalPrice;
    }

    async readTaxPrice() {
        let taxPrice = await driver.findElement(this.taxPriceText).getText();
        let formattedTaxPrice = parseFloat(taxPrice.substring(6));
        return formattedTaxPrice;
    }

    async calculateTaxes() {
        let noTaxesPrice = parseFloat(await this.readItemTotalPrice());
        console.log('noTaxesPrice: ' + noTaxesPrice);

        let finalPrice = await this.readTotalPrice();
        console.log('totalPrice: ' + finalPrice);

        let taxPrice = await this.readTaxPrice();
        console.log('taxPrice: ' + taxPrice);

        let taxesPercentage;

        if (finalPrice != 0) {
            taxesPercentage = ((finalPrice / noTaxesPrice) - 1) * 100;
        } else {
            taxesPercentage = 8.0;
        }

        console.log('taxesPercentage!: ' + taxesPercentage);
        return taxesPercentage.toFixed(1);
    }
}

module.exports = new CheckoutOverviewPage();