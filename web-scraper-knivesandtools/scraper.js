const { Builder, By, until } = require('selenium-webdriver');


async function scrapeOffers() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    
    await driver.get('https://www.knivesandtools.de');

    
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Taschenmesser unter 200 Euro');
    await searchBox.sendKeys('\n');

    
    await driver.wait(until.elementLocated(By.className('products-list')), 10000);

    
    const offers = await driver.findElements(By.className('product-item'));

    for (let offer of offers) {
      const titleElement = await offer.findElement(By.className('product-title'));
      const priceElement = await offer.findElement(By.className('price'));

      const title = await titleElement.getText();
      const price = await priceElement.getText();

      console.log({ title, price });
    }

  } finally {
    
    await driver.quit();
  }
}

scrapeOffers();