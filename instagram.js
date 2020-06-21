let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialFile = process.argv[2];


console.log("Working");
(async function () {
	let data = await fs.promises.readFile(credentialFile, "utf-8");
	let credential = JSON.parse(data);
	login = credential.link;
	email = credential.email;
    pwd = credential.pwd;


	let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized", "--incognito"]
    });

	let numberOfPages = await browser.pages();
	let tab = numberOfPages[0];

	await tab.goto(login, {
		waitUntil: "networkidle2",
    });
    await tab.waitForSelector("input[name='username']");
    await tab.type("input[name='username']", email, {delay : 10});
    await tab.waitForSelector("input[name='password']");
    await tab.type("input[name='password']", pwd, {delay : 10});
    
    await tab.waitForSelector("button[type='submit']");
    await navigationHelper(tab, "button[type='submit']");
    
    await tab.waitForSelector("input[placeholder='Search']");
    await tab.type("input[placeholder='Search']", "the times of india" , {delay : 150});
   await tab.keyboard.press("ArrowDown")
  await tab.keyboard.press("Enter")
  // await tab.waitForSelector(".drKGC a");
   //await tab.click(".drKGC a");
    /*let waitForEveryonePromise=driver.manage().setTimeouts({
        implicit:10000,
        pageLoad:10000
    })*/
//     setTimeout(function(){  }, 10000);

//     tab.click(a);

// 


//doubt
await tab.waitForSelector('div.fuqBx a', {
    visible: true
});

await tab.evaluate(() => {
    document.querySelector('div.fuqBx a').click()
});

let idx = 0;

do {

    await tab.waitForSelector('article > div:nth-child(1) img[decoding="auto"]');

    let elements = await tab.$$('article > div:nth-child(1) img[decoding="auto"]');

    let posts = elements[idx];

    await posts.click({

        delay:100

    });

    let like= await tab.waitForSelector('span.fr66n > button.wpO6b',{
    visible:true});


    if(like){

        await like.click({delay:100});
        
    }

    let closebtn=await tab.waitForSelector('.Igw0E button.wpO6b',{
        visible:true
    });
    console.log(idx+1 +"st"+  "post" +"like")

    await closebtn.click();
    idx++;
    
} while (idx < 35);

  await browser.close();

}
)()
console.log("after");
async function navigationHelper(tab, selector){
    await Promise.all([tab.waitForNavigation({
        waitUntil : "networkidle2"
    }), tab.click(selector)]);
}


