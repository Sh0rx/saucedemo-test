const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('@cucumber/cucumber');
require('chromedriver');
const assert = require('assert');

const loginPage = require('../../pageobjects/loginpage');
const inventoryPage = require('../../pageobjects/inventorypage');
const itemPage = require('../../pageobjects/itempage');

let inventoryPrice, itemPrice;
let numItems, randomIndex;

Given('I am logged in', async () => {
    await loginPage.openPage(loginPage.url);
    let username = 'standard_user';
    let password = 'secret_sauce';
    await loginPage.login(username, password);
});

Given('I am on the articles page', async () => {
    await inventoryPage.openPage(inventoryPage.url);
});

When('I see the price of a random product', async () => {
    numItems = await inventoryPage.getNumItems();
    randomIndex = Math.floor(Math.random() * 6);    //Devuelve un indice entre 0 y el numero de items

    inventoryPrice = await inventoryPage.readProductPrice(randomIndex);
    console.log('inventoryPrice: '+inventoryPrice);
});

When('I click on the product', async () => {
    await inventoryPage.clickItem(randomIndex);
});

Then('I should see the same price in the product page', async () => {
    itemPrice = await itemPage.readProductPrice();
    console.log('itemPrice: '+itemPrice);

    assert.equal(itemPrice, inventoryPrice);
    // await itemPage.comparePrice(itemPrice, inventoryPrice);
});

// BEFORE AND AFTER FUNCTIONS
BeforeAll(async () => {
    console.log("Inside BeforeAll");
    // driver = await new Builder().forBrowser("chrome").build();
});

Before(function () {
    console.log("Inside Before");
});

After(function () {
    console.log("Inside After");
});

AfterAll(async () => {
    console.log("Inside AfterAll");
    await itemPage.closeBrowser();
});
