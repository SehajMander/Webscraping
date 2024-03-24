import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    //by default puppeteer runs headless, i.e. ,
    // does not show the browser page but 
    // setting it to false here will do the opposite, i.e, 
    // it will open/show the browser and then take do the desired work
    headless: false,
    defaultViewport: false, //to adjust the page that will be opened to our screen
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.amazon.com/s?k=gaming+headsets&_encoding=UTF8&content-id=amzn1.sym.12129333-2117-4490-9c17-6d31baf0582a&pd_rd_r=30d76c11-7a36-4236-ac44-d0406f642cc1&pd_rd_w=BoxeD&pd_rd_wg=78Hnu&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=112AJSWKYMGGEDY0BR4C&qid=1711008246&ref=sr_pg_1', {timeout: 0});

  // await page.waitForSelector('.s-result-item');

  // const productHandles = await page.$$('.s-result-item');
    
    // const productHandles = await page.$$('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.s-wide-grid-style.sg-row > div.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > .s-result-item');

    let i = 0;

    let items = [];
  
    // loop thru all handles
    let isBtnDisabled = false;
    while(!isBtnDisabled){
      await page.waitForSelector('[data-cel-widget="search_result_1"]');
      const productHandles = await page.$$('.s-result-item');
      for(const producthandle of productHandles){
        let title = "Null";
        let price = "Null";
        let img = "Null";
        
        //for the titles of the products
        try{
          title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, producthandle);
        // console.log(title);
        } catch (error) {}
        
        //for the prices of the product
        try{
          price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, producthandle);
        // console.log(price)
        } catch (error) {}
        
        //for the image urls of the product
        try{
          img = await page.evaluate(el => el.querySelector(".s-image").getAttribute('src'), producthandle);
        // console.log(img)
        } catch(error) {}   

        // console.log(title, price, img);
        if(title != 'Null'){
          items.push(title, price, img);
        }
      }
      await page.waitForSelector("span.s-pagination-item.s-pagination-next", {timeout: 0});
      const is_disabled = await page.$('span.s-pagination-item.s-pagination-next.s-pagination-disabled') !== null;
      isBtnDisabled = is_disabled;
      if(!is_disabled){
        await Promise.all([
          await page.waitForNavigation({waitUntil:'networkidle0'}),
          await page.click("span.s-pagination-item.s-pagination-next")
        ]);
      }
    }

    console.log(items);
    console.log(items.length);


  // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

//   // Type into search box
//   await page.type('.devsite-search-field', 'automate beyond recorder');

//   // Wait and click on first result
//   const searchResultSelector = '.devsite-result-item-link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

//   // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);
// await page.screenshot({path: 'ex_1.png'});

  // await browser.close();
})();

