const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://mail.google.com');

  // Login to Gmail
  await page.type('input[type="email"]', 'your-email@gmail.com');
  await page.click('#identifierNext');
  await page.waitForSelector('input[type="password"]');
  await page.type('input[type="password"]', 'your-password');
  await page.click('#passwordNext');
  await page.waitForNavigation();

  // Scrape emails
  const emails = await page.evaluate(() => {
    const emailElements = document.querySelectorAll('.zA');
    const emailData = [];
    for (let element of emailElements) {
      const email = {
        subject: element.querySelector('.y6 span').textContent.trim(),
        from: element.querySelector('.yW span').textContent.trim(),
        date: element.querySelector('.y6 .xW').getAttribute('title'),
        snippet: element.querySelector('.y2').textContent.trim(),
      };
      emailData.push(email);
    }
    return emailData;
  });
  
  console.log(emails);

  await browser.close();
})();
