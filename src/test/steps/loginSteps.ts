import { Given, When, Then } from "@cucumber/cucumber"
import {chromium, Page, Browser, expect} from "@playwright/test"
import { fixture } from "../../hooks/pageFixture";

let browser: Browser;
let page: Page;
    Given('User navigates to the application', async function () {
        //Optional
        browser = await chromium.launch({headless: true})
        page = await browser.newPage()
        await page.goto("https://bookcart.azurewebsites.net/")
        fixture.logger.info("User navigated to the application")
    });
    Given('User click on the login link', async function () {
        await page.locator("//span[text()='Login']").click()
    });
    Given('User enter the username as {string}', async function (username) {
        await page.locator("input[formcontrolname='username']").type(username)
    });
    Given('User enter the password as {string}', async function (password) {
        await page.locator("input[formcontrolname='password']").type(password)
    });
    When('User click on the login button', async function () {
        await page.locator("(//span[text()='Login'])[2]").click()
    });
    Then('Login should be success', async function () {
        const text = await page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent()
        console.log("Username: " + text)
        fixture.logger.info("Username: " + text)
    });

    Then('Login should fail', async function () {
        const failureMessage = page.locator("mat-error[role='alert']")
        await expect(failureMessage).toBeVisible()
        console.log(failureMessage)
        fixture.logger.info(failureMessage)
        browser.close()
    });