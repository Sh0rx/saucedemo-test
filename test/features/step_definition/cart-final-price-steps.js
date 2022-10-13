const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('@cucumber/cucumber');
require('chromedriver');
const assert = require('assert');

const loginPage = require('../../pageobjects/loginpage');
const inventoryPage = require('../../pageobjects/inventorypage');
const itemPage = require('../../pageobjects/itempage');
const cartPage = require('../../pageobjects/cartpage');
const checkoutPage = require('../../pageobjects/checkoutpage');
const checkoutOverviewPage = require('../../pageobjects/checkoutoverviewpage');

let sumItemsTotalPrice = 0;

When('I add a random number of products to the cart', async () => {
    let numItems, numItemsToAdd, itemIndexes = [];
    numItems = await inventoryPage.getNumItems();
    numItemsToAdd = Math.floor(Math.random() * numItems);    //Devuelve un numero entre 0 y el numero de items

    itemIndexes = await inventoryPage.getRandomItemIndexes(numItems, numItemsToAdd);
    console.log(`itemIndexes que voy a AÑADIR: ${itemIndexes}`);

    for (let i = 0; i < numItemsToAdd; i++) {
        sumItemsTotalPrice += await inventoryPage.readFloatProductPrice(itemIndexes[i]);
        console.log('sumItemsTotalPrice: ' + sumItemsTotalPrice);

        console.log('Nombre: ' + await inventoryPage.readProductName(itemIndexes[i])); 
        await inventoryPage.clickAddToCartButton((itemIndexes[i] - i)); //Aqui le paso el indice correspondiente
    }

});

When('I click the checkout button', async () => {
    await cartPage.clickCheckoutButton();
});

When('I complete the checkout form', async () => {
    let firstName = 'Manolo';
    let lastName = 'Garcia';
    let postalCode = '37001'
    await checkoutPage.completeForm(firstName, lastName, postalCode);
});

When('I click continue', async () => {
    await checkoutPage.clickContinueButton();
});


Then('I should see that the final price is correct', async () => {
    let checkoutOverviewFinalPrice = await checkoutOverviewPage.readItemTotalPrice();

    assert.equal(sumItemsTotalPrice, checkoutOverviewFinalPrice);
});

Then('I should see that the taxes applied are {float}%', async (expectedTaxesPercentage) => {
    let actualTaxesPercentage = await checkoutOverviewPage.calculateTaxes();

    assert.equal(expectedTaxesPercentage, actualTaxesPercentage);
});