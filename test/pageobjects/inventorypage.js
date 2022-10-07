const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class InventoryPage extends BasePage {

    constructor() {
        super();
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.item = By.className('inventory_item_name');
        this.itemPriceText = By.className('inventory_item_price');

        this.itemAddToCartButton = By.name('add-to-cart-sauce-labs-backpack');
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
    async readProductName() {
        let selectorItem = this.item;
        let inventoryName = await driver.findElement(selectorItem).getText();

        return inventoryName;
    }

    async clickAddToCartButton() {
        let selectorAddToCartBtn = this.itemAddToCartButton;
        await driver.findElement(selectorAddToCartBtn).click();
    }

    async clickCartButton() {
        let selectorCartBtn = this.cartButton;
        await driver.findElement(selectorCartBtn).click();
    }
}

module.exports = new InventoryPage();