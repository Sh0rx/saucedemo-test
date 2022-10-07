const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('@cucumber/cucumber');
require('chromedriver');
const assert = require('assert');

const loginPage = require('../../pageobjects/loginpage');
const inventoryPage = require('../../pageobjects/inventorypage');
const itemPage = require('../../pageobjects/itempage');
const cartpage = require('../../pageobjects/cartpage');

let inventoryName, cartName;

When('I see the name of a random product', async () => {
    inventoryName = await inventoryPage.readProductName();
    console.log('inventoryName: '+inventoryName);
});

When('I add the product to the cart', async () => {
    await inventoryPage.clickAddToCartButton();
});

When('I click the cart button', async () => {
    await inventoryPage.clickCartButton();
});

Then('I should see the same name of the product in the cart page', async () => {
    cartName = await cartpage.readProductName();

    console.log('cartName: '+cartName+'\ninventoryName: '+inventoryName);
    assert.equal(cartName, inventoryName);
});