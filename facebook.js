let puppeteer = require("puppeteer");
let fs = require("fs");


let credentialsFile = process.argv[2];
let pageName = "The Times of India";

(async function(){
    let data = await fs.promises.readFile(credentialsFile, "utf-8");

    let credentials = JSON.parse(data);
    email = credentials.email;
    pwd = credentials.pwd;
    url = credentials.link3;
    

    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized", "--disable-notifications"]
    });

    let numberOfPages = await browser.pages();
    let tab = numberOfPages[0];

    await tab.goto(url, {
        waitUntil: "networkidle2"
    });

    await tab.waitForSelector("input[name='email']");
    await tab.type("input[name='email']", email, {delay : 100});

    await tab.waitForSelector("input[type='password']");
    await tab.type("input[type='password']", pwd , {delay : 100});

    await tab.waitForSelector("#loginbutton");

    await navigationHelper(tab, "#loginbutton");

    await tab.waitForSelector("input[data-testid='search_input']");
    await tab.type("input[data-testid='search_input']", pageName , {delay : 100});

    await tab.waitForSelector("button[aria-label='Search']");
    await navigationHelper(tab, "button[aria-label='Search']");

    await tab.waitForSelector("#pagelet_loader_initial_browse_result #u_ps_fetchstream_1_4_4 ._6v_0._4ik4._4ik5 a");
    let  aTagPage = await tab.$("#pagelet_loader_initial_browse_result #u_ps_fetchstream_1_4_4 ._6v_0._4ik4._4ik5 a");
    let href = await tab.evaluate(function(q){
        return q.getAttribute("href");
    }, aTagPage);

    await tab.goto(href, {
        waitUntil : "networkidle2"
    });


    // await tab.waitForSelector("div[data-key='tab_posts']");
    // await navigationHelper(tab, "div[data-key='tab_posts']")

    await Promise.all([tab.click("div[data-key='tab_posts']"), tab.waitForNavigation({waitUntil : "networkidle2"})]);
    await tab.waitForNavigation({ waitUntil : "networkidle2"});

    let idx = 0
    do {
        
        await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
        let allposts = await tab.$$("#pagelet_timeline_main_column ._1xnd >._4-u2._4-u8");
        // let allposts = await tab.$$(
		// 	"#pagelet_timeline_main_column ._1xnd ._4-u2[role='article']"
		// );
        let cPost = allposts[idx];
        let cPostLike = await cPost.$("._666k");
        await cPostLike.click({ delay: 300 });
        idx++;
        //console.log("abcd");
        await tab.waitForSelector(".uiMorePagerLoader", { hidden: true });

    } while (idx < 10)


})()

async function navigationHelper(tab, selector){
    await Promise.all([tab.waitForNavigation({
        waitUntil : "networkidle2"
    }), tab.click(selector)]);
}