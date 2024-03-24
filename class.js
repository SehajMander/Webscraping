import puppeteer from "puppeteer";

(async() => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/s?k=gaming+headsets&page=20&_encoding=UTF8&content-id=amzn1.sym.12129333-2117-4490-9c17-6d31baf0582a&pd_rd_r=d4df979d-febe-4889-84a2-78283e5c816a&pd_rd_w=JrvSE&pd_rd_wg=Xw6uw&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=SYY9VTB2ZSEH7N6YPR69&qid=1710930473&ref=sr_pg_20',{
        waitUntil: "load"
    });

    const is_disabled = await page.$('span.s-pagination-item.s-pagination-next.s-pagination-disabled') !== null;
    console.log(is_disabled);

    // await browser.close();
})();

