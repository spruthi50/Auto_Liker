
let puppeteer = require("puppeteer");

let fs = require("fs");

let credentialFile = process.argv[2];


console.log("Working");
(async function () {
	let data = await fs.promises.readFile(credentialFile, "utf-8");
	let credential = JSON.parse(data);
	login = credential.link2;
	email = credential.email;
    pwd = credential.pwd;


	let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized", "--incognito"],
       // slowMo:100
    });

	let numberOfPages = await browser.pages();
	let tab = numberOfPages[0];

	await tab.goto(login, {
		waitUntil: "networkidle2",
    });
    await tab.waitForSelector("input[name='session[username_or_email]']");
    await tab.type("input[name='session[username_or_email]']",email,{delay:10});
    
    await tab.waitForSelector("input[name='session[password]']");
    await tab.type("input[name='session[password]']",pwd,{delay:10});
    await tab.waitForSelector("div[role='button']");
    await navigationHelper(tab, "div[role='button']");

    await tab.waitForSelector("input[placeholder='Search Twitter']");
    await tab.type("input[placeholder='Search Twitter']", " The Times Of India" , {delay : 150});
    await tab.keyboard.press("ArrowDown",{delay:100})
    await tab.keyboard.press("ArrowDown")
    await tab.keyboard.press("Enter")

    await tab.waitForSelector('nav > div:nth-child(2) div[class="css-1dbjc4n r-16y2uox r-6b64d0"]');

    let elements = await tab.$$('nav > div:nth-child(2) div[class="css-1dbjc4n r-16y2uox r-6b64d0"]');
    await elements[2].click({
        delay:100
    })
    await tab.waitForSelector("div[class='css-18t94o4 css-1dbjc4n r-1ny4l3l r-1j3t67a r-1w50u8q r-o7ynqc r-6416eg']");
   let x= await tab.$$("div[class='css-18t94o4 css-1dbjc4n r-1ny4l3l r-1j3t67a r-1w50u8q r-o7ynqc r-6416eg']");
   await x[0].click({
       delay:100
   })
   let idx=0
   do{
       try{
    await tab.waitForSelector("div[class='css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-5f2r5o r-1mi0q7o']",{timeout:100});
    let y= await tab.$$("div[class='css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-5f2r5o r-1mi0q7o']");

    
    console.log(y.length);
    let ele=y[idx];
    idx++;
    await Promise.all([ele.click({delay:100}), tab.waitForNavigation({
        
        waitUntil : "networkidle2"
    })]);}
    catch(err){
        continue
        idx++;
    }

       await tab.waitForSelector("div[class='css-1dbjc4n r-18u37iz r-1h0z5md r-3qxfft r-h4g966 r-rjfia']");
       let z= await tab.$$("div[class='css-1dbjc4n r-18u37iz r-1h0z5md r-3qxfft r-h4g966 r-rjfia']");
       
       await z[2].click({delay:1000});
    //     await z[1].click();
    //    await tab.waitForSelector("div[class='css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l r-1j3t67a r-9qu9m4 r-o7ynqc r-6416eg r-13qz1uu']")
    //    let n=await tab.$$("div[class='css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l r-1j3t67a r-9qu9m4 r-o7ynqc r-6416eg r-13qz1uu']")
    //     await n[0].click({
    //        delay:100
    //    });
       
       try{
       await tab.waitForSelector("div[class='css-1dbjc4n r-1awozwy r-1loqt21 r-1777fci r-1d2f490 r-1ny4l3l r-1sp51qo r-u8s1d r-ipm5af']",{timeout:100});
       await tab.click("div[class='css-1dbjc4n r-1awozwy r-1loqt21 r-1777fci r-1d2f490 r-1ny4l3l r-1sp51qo r-u8s1d r-ipm5af']");
       }

    catch(err){
        await tab.waitForSelector("div[class='css-1dbjc4n r-1habvwh r-1pz39u2 r-1777fci r-1vsu8ta r-u0dd49']");
        await tab.click("div[class='css-1dbjc4n r-1habvwh r-1pz39u2 r-1777fci r-1vsu8ta r-u0dd49']");
        
    }
      //await tab.waitForSelector("div[class='css-1dbjc4n r-1habvwh r-1pz39u2 r-1777fci r-1vsu8ta r-u0dd49']");
     // await tab.click("div[class='css-1dbjc4n r-1habvwh r-1pz39u2 r-1777fci r-1vsu8ta r-u0dd49']");

       
    }while(idx<=10)
    await browser.close();

   



}
)()
async function navigationHelper(tab, selector){
    await Promise.all([tab.waitForNavigation({
        waitUntil : "networkidle2"
    }), tab.click(selector)]);
}
//css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-5f2r5o r-1mi0q7o