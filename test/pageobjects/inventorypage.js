const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class InventoryPage extends BasePage {

    constructor() {
        super();
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.item = By.className('inventory_item_name');
        this.itemPriceText = By.className('inventory_item_price');

        this.itemAddToCartButton = By.className('btn btn_primary btn_small btn_inventory');
        this.cartButton = By.id('shopping_cart_container');

        this.numProducts;
    }

    // set numProducts(numProducts) {
    //     let items = await driver.findElements(this.item); 
    //     this.numProducts = numProducts;
    // }

    /*************
     * product-price-steps
     */

    async getNumItems() {
        let items = await driver.findElements(this.item);
        return items.length;
    }

    async readProductPrice(randomIndex) {
        let selectorItemPrice = this.itemPriceText;
        let inventoryPrices = await driver.findElements(selectorItemPrice);

        return await inventoryPrices[randomIndex].getText();

        // for(let i=0; i<inventoryPrices.length; i++) {
        //     console.log('precios' + i +': '+ await inventoryPrices[i].getText());
        // }
    }

    async clickItem(randomIndex) {
        let selectorItem = this.item;
        let items = await driver.findElements(selectorItem);

        await items[randomIndex].click();
    }

    /*************
     * product-name-steps
     */
    async readProductName(randomIndex) {
        let selectorItem = this.item;
        let inventoryNames = await driver.findElements(selectorItem);

        return await inventoryNames[randomIndex].getText();
    }

    async clickAddToCartButton(randomIndex) {
        let selectorAddToCartBtn = this.itemAddToCartButton;
        let addToCartItemButtons = await driver.findElements(selectorAddToCartBtn);

        await addToCartItemButtons[randomIndex].click();
    }

    async clickCartButton() {
        let selectorCartBtn = this.cartButton;
        await driver.findElement(selectorCartBtn).click();
    }
}

module.exports = new InventoryPage();