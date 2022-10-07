const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');
const { assert } = require("assert");

class ItemPage extends BasePage {
    constructor() {
        super();
        this.url = 'https://www.saucedemo.com/inventory-item.html';
        this.itemPriceText = By.className('inventory_details_price');
    }

    async readProductPrice(randomIndex) {
        let selectorItemPrice = this.itemPriceText;
        let itemPrice = await driver.findElement(selectorItemPrice).getText();
        // console.log('itemPrice: '+itemPrice);
        return itemPrice;
    }

    async comparePrice(itemPrice, inventoryPrice) {
        console.log('itemPrice-inventoryPrice: ' + itemPrice +'-'+ inventoryPrice)
        await assert.equal(itemPrice, inventoryPrice);
    }
}

module.exports = new ItemPage();