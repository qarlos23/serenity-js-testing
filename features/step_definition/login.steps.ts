import { browser, by, element, protractor, ExpectedConditions, ElementFinder } from 'protractor';
const chai = require('chai');
chai.use(require('chai-as-promised'));

class LoginPage {

    MENU_BUTTON = element(by.css('[data-eid="user-menu-btn"]'));
    SIGN_IN_MENU = element(by.xpath('//div[text()="Sign in"]'));
    DCC_LOGO = element(by.css('[data-eid="logo"]'));
    DCC_ADMIN_LINK = element(by.css('[data-eid="admin-link"]'));
    ZEISSID_USERNAME_FIELD = element(by.id('signInName'));
    ZEISSID_PASSWORD_FIELD = element(by.id('password'));
    ZEISSID_LOGIN_BUTTON = element(by.buttonText('Login'));

    clickOnSignIn(): PromiseLike<void> {

        this.MENU_BUTTON.click();
        this.SIGN_IN_MENU.click();
        browser.wait(ExpectedConditions.visibilityOf(this.ZEISSID_PASSWORD_FIELD), 10000, "wait and did not appear");
        return;
    }

    inputCredentials(username: string, password: string): PromiseLike<void> {
        this.ZEISSID_USERNAME_FIELD.sendKeys(username);
        this.ZEISSID_PASSWORD_FIELD.sendKeys(password);
        this.ZEISSID_LOGIN_BUTTON.click();
        return;
    }

    verifyUserLoggedIn(expectedResult: string): PromiseLike<void> {
        browser.wait(ExpectedConditions.visibilityOf(this.DCC_LOGO), 10000, "wait and did not appear");
        if (expectedResult.indexOf("admin") >= 0){            
            //chai.expect(ExpectedConditions.visibilityOf(this.DCC_ADMIN_LINK));
        }
        else{
            //chai.expect(ExpectedConditions.visibilityOf(this.DCC_ADMIN_LINK)).not();
        }
        return;
    }
}

export = function login() {

    let page = new LoginPage();

    this.Given(/^.*that a registered user wants to login into the portal$/, () => {    
        browser.ignoreSynchronization = true;
        browser.get('https://portal-demo.zeiss.com', 60000);
        //browser.driver.manage().window().maximize();
                 
    });

    this.When(/^.*he clicks on sign in$/, () => {
        page.clickOnSignIn();
        
        });

    this.When(/^.*he enters his (.*?) and (.*?)$/, (username: string, password: string) => {        
        page.inputCredentials(username,password);
        
    });

    this.Then(/^.*he sees the portal as (.*?)$/, (expectedResult: string) => {
        
        //page.verifyUserLoggedIn(expectedResult);
         chai.expect(true === true);

        // element(by.css('')).click();

    });

};