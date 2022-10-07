const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class CheckoutOverviewPage extends BasePage {

    constructor() {
        super();
        this.itemTotalPrice = By.className('summary_subtotal_label');
    }

    async readFinalPrice() {
        let finalPrice = await driver.findElement(this.itemTotalPrice).getText();
        // console.log('finalPrice: '+finalPrice);
        let formattedFinalPrice = finalPrice.substring(13);
        console.log('formattedFinalPrice: '+formattedFinalPrice);
        return formattedFinalPrice;
    }
}

module.exports = new CheckoutOverviewPage();