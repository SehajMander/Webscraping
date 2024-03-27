//scraping the "scrapethissite" webpage
import puppeteer from 'puppeteer';

(async () => {
    // Launch browser and go to page
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    //opens a new tab in browser
    const page = await browser.newPage();
    //go to a page mentioned
    await page.goto("https://www.scrapethissite.com/");

    //takes the screenshot of the site and save it in the mentioned file
    // await page.screenshot({path: "example.png"});

    //grab the elements from the page
    const grabElement = await page.evaluate(() => {
        //example 1 :
        // const element = document.querySelector("#hero > div > div > div > p");
        // return element.innerHTML;
        // return element.innerText;

        //example 2 :
        const navBarTags = document.querySelectorAll("#site-nav > div > div > ul > li");
        let navElements = [];
        navBarTags.forEach((tag) => {
            navElements.push(tag.innerText);
        });
        return navElements;
    });

    console.log(grabElement);

    //closing the browser
    await browser.close();
})();

