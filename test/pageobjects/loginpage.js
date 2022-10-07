const { By, Key, Builder, until } = require("selenium-webdriver");
const BasePage = require('./basepage');

class LoginPage extends BasePage {

    constructor() {
        super();
        this.url = 'https://www.saucedemo.com/';
        // elements: {
        //     this.usernameInput = By.name('user-name'),
        //     this.passwordInput = By.name('password'),
        //     this.loginButton = By.name('login-button')
        // }
        this.usernameInput = By.name('user-name');
        this.passwordInput = By.name('password');
        this.loginButton = By.name('login-button');
    }

    async login(username, password) {
        let selectorUsername = this.usernameInput;
        let selectorPassword = this.passwordInput;
        let selectorLoginBtn = this.loginButton;
        await driver.findElement(selectorUsername).sendKeys(username);
        await driver.findElement(selectorPassword).sendKeys(password);
        await driver.findElement(selectorLoginBtn).click();
    }

}

module.exports = new LoginPage();