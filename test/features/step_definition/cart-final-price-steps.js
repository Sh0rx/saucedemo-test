const { Given, When, Then, BeforeAll, Before, After, AfterAll } = require('@cucumber/cucumber');
require('chromedriver');
const assert = require('assert');

const loginPage = require('../../pageobjects/loginpage');
const inventoryPage = require('../../pageobjects/inventorypage');
const itemPage = require('../../pageobjects/itempage');
const cartPage = require('../../pageobjects/cartpage');
const checkoutPage = require('../../pageobjects/checkoutpage');
const checkoutOverviewPage = require('../../pageobjects/checkoutoverviewpage');

let numItems, numItemsToAdd;
let sumFinalPrice=0, checkoutOverviewFinalPrice;

When('I add a random number of products to the cart', async () => {
    numItems = await inventoryPage.getNumItems();
    numItemsToAdd = Math.floor(Math.random() * numItems);    //Devuelve un numero entre 0 y el numero de items

    for (let i=0; i<numItemsToAdd; i++) {
        sumFinalPrice += await inventoryPage.readFloatProductPrice(i);
        console.log('sumFinalPrice: '+sumFinalPrice);

        console.log('Nombre: '+await inventoryPage.readProductName(0)); //Aqui el indice siempre es el mismo porque al seleccionar
        await inventoryPage.clickAddToCartButton(0);                    //los elementos el siguiente disponible con el boton add
    }                                                                   //va a ser el que tiene el índice 0

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
    checkoutOverviewFinalPrice = await checkoutOverviewPage.readFinalPrice();

    assert.equal(sumFinalPrice, checkoutOverviewFinalPrice);
});