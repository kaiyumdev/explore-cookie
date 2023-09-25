import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();
await page.goto("https://www.onetrust.com/products/cookie-consent/", {
  waitUntil: "networkidle2",
});

//wait for selector and then click
// const acceptBtn = await page
//   .waitForSelector("#onetrust-accept-btn-handler", { timeout: 2000 })
//   .catch(() => {
//     console.log("cookie popup not found for 2 seconds");
//   });
// if (acceptBtn) {
//   await acceptBtn.click();
// }

//find element and then click
// const acceptBtn = await page.$("#onetrust-accept-btn-handler");
// if (acceptBtn) {
//   await acceptBtn.click();
// }

//remove cookie consent with evaluate
// await page.evaluate(() => {
//   document.querySelector("#onetrust-consent-sdk")?.removeEventListener();
// });

await page.addStyleTag({ content: `#onetrust-consent-sdk {display: none}` });
