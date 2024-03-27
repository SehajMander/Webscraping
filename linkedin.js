import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });

    const page = await browser.newPage();

    try{
        await page.goto("https://in.linkedin.com/");

        //opening linkedint and then filling hte credentials onto it and signing in onto the linkedin
        await page.waitForSelector('a[href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"]');
        await page.click('a[href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"]');
        await page.type("#username", "sehajpreetkaurmander@gmail.com", {delay:100});
        await page.type("#password", "M@nder002", {delay:100});
        await page.click('button[data-litms-control-urn="login-submit"]');

        await page.waitForSelector('.search-global-typeahead__input');
        await page.type('.search-global-typeahead__input', 'JUIT', { delay: 100 });
        await page.keyboard.press('Enter');
        
        await page.waitForSelector('#search-reusables__filters-bar > ul > li:nth-child(4) > button');
        await page.click('#search-reusables__filters-bar > ul > li:nth-child(4) > button');

        //waits for the search results to load completely
        await page.waitForNavigation();

        //extracts the search results
        const searchResults = await page.evaluate(() => {
            const results = [];
            const items = document.querySelectorAll('reusable-search__entity-result-list list-style-none > li');

            items.forEach((item) => {
                const user = item.querySelector('#ember945 > div > div.update-components-actor.display-flex.update-components-actor--with-control-menu > div > div > a.app-aware-link.update-components-actor__meta-link > span.update-components-actor__title > span.update-components-actor__name.hoverable-link-text.t-14.t-bold.t-black > span:nth-child(1) > span').innerText.trim;
                // const postContent = item.querySelector('#ember945 > div > div.feed-shared-update-v2__description-wrapper.mr2 > div > div > span > span > span').innerText;
                results.push({user});
            });

            return results;
        });

        console.log(searchResults);

    } catch(err){
        console.log('Error occurred : ', err);
    } 

    await browser.close();
})();

// #search-reusables__filters-bar > ul > li:nth-child(4) > button
// #ember1308 > div > div.update-components-actor.display-flex.update-components-actor--with-control-menu > div > div > a.app-aware-link.update-components-actor__meta-link > span.update-components-actor__title > span.update-components-actor__name.hoverable-link-text.t-14.t-bold.t-black > span:nth-child(1) > span
// #ember1379 > div > div.update-components-actor.display-flex.update-components-actor--with-control-menu > div > div > a.app-aware-link.update-components-actor__meta-link > span.update-components-actor__title > span.update-components-actor__name.hoverable-link-text.t-14.t-bold.t-black > span:nth-child(1) > span
// #ember1308 > div > div.feed-shared-update-v2__description-wrapper.mr2 > div > div > span > span > span