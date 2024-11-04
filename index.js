import puppeteer from "puppeteer";

const url = "https://masterlocksmiths.wildapricot.org/";

const main = async () => {
 const browser = await puppeteer.launch();
 const page = await browser.newPage();

 await page.goto(url);

 const allItems = await page.evaluate(() => {
  const items = document.querySelectorAll("tr.normal");

  console.log(items);

  return Array.from(items).map((item) => {
   //  const url = item.querySelector('[title="Go to member details"]').href;
   const tableData = item.querySelector(".memberDirectoryColumn1");
   const memberValue = tableData.querySelector(".memberValue");
   const header = memberValue.querySelector("h5");
   const title = header.querySelector("a").innerText;
   const url = header.querySelector("a").href;
   return { title, url };
  });

  // return items;
 });

 console.log(allItems);

 // Close browser.
 await browser.close();
};

main();
