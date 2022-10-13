const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');
const assert = require('assert');

class InventoryPage extends BasePage {

    constructor() {
        super();
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.item = By.className('inventory_item_name');
        this.itemPriceText = By.className('inventory_item_price');

        this.itemAddToCartButton = By.className('btn btn_primary btn_small btn_inventory');
        this.cartButton = By.id('shopping_cart_container');

        this.filterButton = By.className('product_sort_container');
        this.filterOptions = By.css('.product_sort_container > option');
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

    async readFloatProductPrice(randomIndex) {
        let selectorItemPrice = this.itemPriceText;
        let inventoryPrices = await driver.findElements(selectorItemPrice);

        let inventoryPrice = await inventoryPrices[randomIndex].getText();
        let formattedInventoryPrice = parseFloat(inventoryPrice.substring(1));

        // console.log('parseFloat: ' + formattedInventoryPrice);
        return formattedInventoryPrice;
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

        console.log('randomIndex click: ' + randomIndex);
        await addToCartItemButtons[randomIndex].click();
    }

    async clickCartButton() {
        let selectorCartBtn = this.cartButton;
        await driver.findElement(selectorCartBtn).click();
    }

    async getRandomItemIndexes(numItems, numItemsToAdd) {
        let itemIndexes = [];
        // let numItems = await this.getNumItems();
        // let numItemsToAdd = Math.floor(Math.random() * numItems);    //Devuelve un numero entre 0 y el numero de items

        //Lista de indices de los items [0,1,2,3,4,...]
        for (let i = 0; i < numItems; i++) {
            itemIndexes.push(i);
        }
        itemIndexes = itemIndexes.sort(function () { return Math.random() - 0.5 }); //Desordeno los items

        //Quito de la lista los items que no voy a añadir
        for (let i = 0; i < (numItems - numItemsToAdd); i++) {
            itemIndexes.pop();
        }

        //Ordeno la lista de items que voy a añadir
        itemIndexes.sort();

        return itemIndexes;
    }

    /************************
     * filter-products-steps
     */
    async clickFilterButton() {
        await driver.findElement(this.filterButton).click();
    }

    async clickFilterOption(filterOption) {
        let selectorOptions = this.filterOptions;
        let filterOptions = await driver.findElements(selectorOptions);
        let flag = false;

        for (let i = 0; i < filterOptions.length; i++) {
            // console.log('options: ' + await filterOptions[i].getText());
            try {
                if (await filterOptions[i].getText() == filterOption) {
                    console.log('OPCION ENCONTRADA');
                    flag = true;
                    await filterOptions[i].click();
                }
            } catch {
                console.error('error selenium');
            }

        }

        assert.equal(flag, true);
    }

    async readAllProductNames() {
        let productNamesList = [];
        let productNamesObject = await driver.findElements(this.item);


        for (let i = 0; i < productNamesObject.length; i++) {
            productNamesList[i] = await productNamesObject[i].getText();
        }

        return productNamesList;
    }

    async readAllProductPrices() {
        let productPricesList = [], formattedProductPricesList = [];
        let productPricesObject =  await driver.findElements(this.itemPriceText);

        for (let i=0; i<productPricesObject.length; i++) {
            productPricesList[i] = await productPricesObject[i].getText();
            formattedProductPricesList[i] = parseFloat(productPricesList[i].substring(1));
        }

        return formattedProductPricesList;
    }

}

module.exports = new InventoryPage();