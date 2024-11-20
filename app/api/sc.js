'use server'
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const Chrome = require('selenium-webdriver/chrome')
// import { Builder, Browser, By, Key, until, chromium } from 'selenium-webdriver'
// import  from 'mocha'
// import { ChromiumWebDriver } from 'selenium-webdriver/chromium'
// import { ServiceBuilder } from 'selenium-webdriver/chrome'
// import { ChromiumWebDriver } from 'selenium-webdriver/chromium'

const service = new Chrome.ServiceBuilder()
const driver = new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(service)
    .build()
// const { Keyboard } = require('selenium-webdriver/lib/input')
// ; (async function example() {
//   try {
//     // await driver.get('https://www.google.com/ncr')
//     await driver.get('https://handla.ica.se/produkt/4011800569518')
//     await Stores.ica()

//     // await await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)

//     // await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
//   } finally {
//     // await driver.quit()
//   }
// })()

let hasRan = false
let cookiesAccepted = false
let retries = 0
let iteratedChildren = 2
const productInformation = {
    name: '',
    img: '',
    brand: '',
    ingredients: '',
}

export async function run() {
    await driver.get('https://handla.ica.se/produkt/4011800569518')
    await Stores.ica()
}

// const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

class Stores {
    static async acceptCookies(cssPath) {
        if (!cookiesAccepted) {
            const acceptButton = await driver.findElement(By.css(cssPath))
            if (await acceptButton.isDisplayed()) {
                await acceptButton.sendKeys(Key.ENTER)
                await acceptButton.sendKeys('\n')
                await acceptButton.click()
                cookiesAccepted = true
            }
        }
    }

    static async finish() {
        hasRan = true
        cookiesAccepted = false
        retries = 0
        // await driver.close()
        await driver.quit()
    }

    static async onFailure(scrollDown) {
        if (retries >= 100) {
            if (scrollDown) {
                await driver
                    .findElement(By.tagName('body'))
                    .sendKeys(Key.ARROW_DOWN)
            }
            // await delay(0.2)
        } else if (retries >= 300) {
            // await delay(0.5)
        } else if (retries >= 500) {
            // await delay(1)
        }
        retries++
    }

    static async ica() {
        try {
            // console.log(await driver.findElement(By.css('button#onetrust-accept-btn-handler')))
            await this.acceptCookies('button#onetrust-accept-btn-handler')

            let brandFound = false
            let ingredientsFound = false

            while (!(brandFound && ingredientsFound)) {
                // if (iteratedChildren === 7) {
                // 	console.log('No ingredients found')
                // 	break
                // }

                const currentSection = await driver.findElement(
                    By.css(
                        `#product > div > div > div:nth-child(${iteratedChildren})`
                    )
                )

                if (
                    (await currentSection
                        .findElement(By.tagName('h2'))
                        .getText()) === 'Varumärke'
                ) {
                    productInformation.brand = await currentSection
                        .findElement(By.tagName('p'))
                        .getText()
                    brandFound = true
                }

                if (
                    (await currentSection
                        .findElement(By.tagName('h2'))
                        .getText()) === 'Ingredienser'
                ) {
                    productInformation.ingredients = await currentSection
                        .findElement(By.tagName('p'))
                        .getText()
                    ingredientsFound = true
                }

                setTimeout(() => {
                    iteratedChildren++
                    console.log(iteratedChildren)
                }, 500)
            }

            productInformation.name = await driver
                .findElement(By.css('#product > div > div > h1'))
                .getText()
            productInformation.img = await driver
                .findElement(By.css('img'))
                .getAttribute('src')

            console.log(JSON.stringify(productInformation))

            await this.finish()
        } catch (error) {
            setTimeout(async () => {
                await this.onFailure(false)
                await this.ica()
            }, 500)
        }
    }

    static async coop() {
        try {
            this.acceptCookies('.cmpboxbtn.cmpboxbtnyes.cmptxt_btn_yes')

            const locatedUrl = await driver
                .findElement(By.css('.ProductTeaser-media > a'))
                .getAttribute('href')
            driver.get(locatedUrl)

            const image = await driver.findElement(
                By.css('.ItemInfo-image img')
            )
            const name = await driver.findElement(By.css('h1.ItemInfo-heading'))
            const manufacturer = await driver.findElement(
                By.css('span.ItemInfo-brand')
            )

            const informationBtn = await driver.findElement(
                By.css(
                    "div[data-product-information='Produktfakta'] > div > button"
                )
            )
            informationBtn.sendKeys(Key.ENTER)

            const ingredients = await driver.findElement(
                By.css('.mpl9oZN6.rnLahZtT > div > div')
            )

            productInformation.brand = await manufacturer.getText()
            productInformation.img = await image.getAttribute('src')
            productInformation.name = await name.getText()
            productInformation.ingredients = await ingredients.getText()

            console.log(JSON.stringify(productInformation))

            this.finish()
        } catch (error) {
            this.onFailure(true)
            this.coop()
        }
    }
}
