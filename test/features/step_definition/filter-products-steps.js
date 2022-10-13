const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('@cucumber/cucumber');
require('chromedriver');
const assert = require('assert');

const loginPage = require('../../pageobjects/loginpage');
const inventoryPage = require('../../pageobjects/inventorypage');

When(/^I filter the products by (.+)$/, async (filterOption) => {
    await inventoryPage.clickFilterButton();

    console.log('filterOption-step: ' + filterOption);
    await inventoryPage.clickFilterOption(filterOption);
});

Then(/^I should see that the products are ordered correctly according to (.+)$/, async (filterOption) => {

    let actualProductList = [], expectedProductList = [];

    switch (filterOption) {
        case 'Name (A to Z)':
            actualProductList = await inventoryPage.readAllProductNames();
            for (let i = 0; i < actualProductList.length; i++) {
                expectedProductList[i] = actualProductList[i];
            }
            expectedProductList.sort();
            break;

        case 'Name (Z to A)':
            actualProductList = await inventoryPage.readAllProductNames();
            for (let i = 0; i < actualProductList.length; i++) {
                expectedProductList[i] = actualProductList[i];
            }
            expectedProductList.sort().reverse();
            break;

        case 'Price (low to high)':
            actualProductList = await inventoryPage.readAllProductPrices();
            for (let i = 0; i < actualProductList.length; i++) {
                expectedProductList[i] = actualProductList[i];
            }
            expectedProductList.sort(function (a, b) { return a-b; }); //Ordenar los numeros de menor a mayor
            break;

        case 'Price (high to low)':
            actualProductList = await inventoryPage.readAllProductPrices();
            for (let i = 0; i < actualProductList.length; i++) {
                expectedProductList[i] = actualProductList[i];
            }
            expectedProductList.sort(function (a, b) { return a-b; }).reverse(); //Ordenar los numeros de mayr a menor
            break;
    }

    console.log('actual:');
    console.log(actualProductList);
    console.log('expected:');
    console.log(expectedProductList);

    assert.deepEqual(actualProductList, expectedProductList);   // assert.deepEqual para comparar arrays

});