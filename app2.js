import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });

    const page = await browser.newPage();

    await page.goto("https://quotes.toscrape.com/");

    
    // Example 1 : scraping the quotes and their respective authors from
    // the mentioned webpage using evaluate function which used for the 
    // purpose of scraping the data
    // const grabElements = await page.evaluate(() => {
    //     const quotes = document.querySelectorAll(".quote");
    //     let quotesArr = [];

    //     quotes.forEach((quoteTag) => {
    //         const quoteInfo = quoteTag.querySelectorAll("span");
    //         const actualQuote = quoteInfo[0];
    //         const actualAuthor = quoteInfo[1];

    //         const authorName = actualAuthor.querySelector("small");

    //         quotesArr.push({
    //             quote: actualQuote.innerText,
    //             author: authorName.innerText,
    //         });
    //     });
    //     return quotesArr;
    // });

    // console.log(grabElements);

    //Example 2 : logging onto the same page using a click function by 
    // entering some info such as username and password
    await page.click('a[href="/login"]');
    //puppeteer also has a function named "type" in which first we need
    // to pass the identifier and then we need to pass the text whatever we
    // want for that identifier
    //delay function in these two just opens the page and displays the bot
    // filling the info visually, but better to use without delay to make it faster
    await page.type("#username", "SehajMander", {delay: 100}); 
    await page.type("#password", "hello123", {delay: 100});
    // await page.type("#username", "SehajMander");
    // await page.type("#password", "hello123");

    await page.click('input[value="Login"]');

    const grabElements = await page.evaluate(() => {
        const quotes = document.querySelectorAll(".quote");
        let quotesArr = [];

        quotes.forEach((quoteTag) => {
            const quoteInfo = quoteTag.querySelectorAll("span");
            const actualQuote = quoteInfo[0];
            const actualAuthor = quoteInfo[1];

            const authorName = actualAuthor.querySelector("small");

            quotesArr.push({
                quote: actualQuote.innerText,
                author: authorName.innerText,
            });
        });
        return quotesArr;
    });
    
    console.log(grabElements);

    await page.click('a[href="/logout"]');

    console.log("Logged out successfully!!");

    await browser.close();
})();