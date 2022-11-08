const puppeteer = require('puppeteer');
const TurndownService = require('turndown');

(async () => {
    // check whether command line argument is passed or not
    if (process.argv.length <= 2) {
        //exit the program
        console.log("Usage: " + __filename + " URL");
        process.exit(-1);
    }


    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()

    // go to the page specified in the command line arguments
    await page.goto(process.argv[2])

    // wait js load
    setTimeout(async () => {

        // css selector
        const description = await page.$('div[data-key="description-content"]')
  

        const innerHTML = await page.evaluate(query => query.innerHTML, description)
        // console.log(text)
        const turndownService = new TurndownService();

        const markdown = turndownService.turndown(innerHTML);
        
        console.log(markdown)
        
        // exit
        await browser.close()
        // exit nodejs
        process.exit(0)
    }, 3000)
})()