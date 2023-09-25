import puppeteer from "puppeteer";
import path from "path";
import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
import fetch from "cross-fetch"; // required 'fetch'

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

const blocker = await PuppeteerBlocker.fromLists(fetch, [
  "https://easylist.to/easylist/easylist.txt",
  "https://secure.fanboy.co.nz/fanboy-cookiemonster.txt",
]);

await blocker.enableBlockingInPage(page);
await page.goto("https://www.onetrust.com/products/cookie-consent/", {
  waitUntil: "networkidle2",
});

// wait for selector and then click
const acceptBtn = await page
  .waitForSelector("#onetrust-accept-btn-handler", { timeout: 2000 })
  .catch(() => {
    console.log("cookie popup not found for 2 seconds");
  });
if (acceptBtn) {
  await acceptBtn.click();
}

// find element and then click
const findBtn = await page.$("#onetrust-accept-btn-handler");
if (findBtn) {
  await findBtn.click();
}

await page.screenshot({ path: "consent.png" });
await browser.close();

//remove cookie consent with evaluate
// await page.evaluate(() => {
//   document.querySelector("#onetrust-consent-sdk")?.remove();
// });

// await page.addStyleTag({ content: `#onetrust-consent-sdk {display: none}` });

// await page.addScriptTag({
//   content: `document.querySelector("#onetrust-consent-sdk)?.remove()`,
// });
// await page.screenshot({ path: "data/consent.png" });

// import puppeteer from "puppeteer";
// import path from "path";
// import fs from "fs";
// import { PuppeteerBlocker } from "@cliqz/adblocker-puppeteer";
// import fetch from "cross-fetch"; // required 'fetch'
// (async () => {
//   try {
//     const browser = await puppeteer.launch({ headless: false });

//     const blocker = await PuppeteerBlocker.fromLists(fetch, [
//       "https://easylist.to/easylist/easylist.txt",
//       "https://secure.fanboy.co.nz/fanboy-cookiemonster.txt",
//     ]);

//     await blocker.enableBlockingInPage(page);

//     const page = await browser.newPage();
//     await page.goto("https://www.onetrust.com/products/cookie-consent/", {
//       waitUntil: "networkidle2",
//     });

//     const directory = "data";
//     const filename = "consent.png";
//     const filePath = path.join(directory, filename);

//     // Create the 'data' directory if it doesn't exist
//     if (!fs.existsSync(directory)) {
//       fs.mkdirSync(directory);
//     }

//     await page.screenshot({ path: filePath });

//     await browser.close();
//     console.log(`Screenshot saved at ${filePath}`);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// })();
