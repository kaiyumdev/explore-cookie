import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();
await page.goto("https://www.onetrust.com/products/cookie-consent/", {
  waitUntil: "networkidle2",
});

await page
  .waitForSelector("#onetrust-accept-btn-handler", { timeout: 2000 })
  .catch(() => {
    console.log("cookie popup not found for 2 seconds");
  });
const acceptBtn = await page.$("#onetrust-accept-btn-handler");
if (acceptBtn) {
  await acceptBtn.click();
}
