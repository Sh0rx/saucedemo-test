const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class CartPage extends BasePage {

    constructor() {
        super();
        this.url = 'https://www.saucedemo.com/cart.html';
        this.product = By.className('inventory_item_name');
        this.checkoutButton = By.name('checkout');
    }

    /*************
     * product-name-steps
     */
    async readProductName() {
        let selectorProduct = this.product;
        let cartName = await driver.findElement(selectorProduct).getText(); 
        return cartName;
    }

    async clickCheckoutButton() {
        await driver.findElement(this.checkoutButton).click();
    }

}

module.exports = new CartPage();