let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialFile = process.argv[2];

console.log("Working");

(async function () {
	// let data = await fs.promises.readFile(credentialFile, "utf-8");
	// let credential = JSON.parse(data);
	// login = credential.link3;
	

	let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"],
        slowMo:150

    });

	let numberOfPages = await browser.pages();
	let tab = numberOfPages[0];

	
    
    // let tab1 = numberOfPages[1];
    // let tab2 = numberOfPages[2];
    let everythinsolved = [];

    let solveFacebook = facebook(browser, tab);
    everythinsolved.push(solveFacebook);
    let solveTwitter = twitter(browser);
    everythinsolved.push(solveTwitter);
    let solveInstagram = instagram(browser);
    everythinsolved.push(solveInstagram);

     Promise.all(everythinsolved)

    
})()
async function facebook(browser,tab) {
	let data = await fs.promises.readFile(credentialFile, "utf-8");
	let credential = JSON.parse(data);
	login = credential.link3;
	email = credential.email;
	pwd = credential.pwd;

	await tab.goto(login, {
		waitUntil: "networkidle2",
	});
	await tab.waitForSelector("#email");
	await tab.type("#email", email, {delay : 10});
	await tab.waitForSelector("#pass");
	await tab.type("#pass", pwd, {delay : 10});
	await tab.waitForSelector("#loginbutton");
    //await tab.click("button[data-analytics='LoginPassword']");
    await Promise.all([tab.waitForNavigation({
        waitUntil:"networkidle0"
	}), tab.click("#loginbutton")]);
	await tab.waitForSelector("input[data-testid='search_input']");
	await tab.type("input[data-testid='search_input']", "the times of india" , {delay : 100});
	//click on search button
	await tab.waitForSelector("button[aria-label='Search']");
	await navigationHelper(tab, "button[aria-label='Search']");
	
	//click on page
	//doubt
	await tab.waitForSelector("#pagelet_loader_initial_browse_result #u_ps_fetchstream_1_4_4 ._6v_0._4ik4._4ik5 a");
    let  aTagPage = await tab.$("#pagelet_loader_initial_browse_result #u_ps_fetchstream_1_4_4 ._6v_0._4ik4._4ik5 a");
    let href = await tab.evaluate(function(q){
        return q.getAttribute("href");
    }, aTagPage);

    await tab.goto(href, {
        waitUntil : "networkidle2"
	});
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
	
	

	



}
async function twitter(browser) {
	let data = await fs.promises.readFile(credentialFile, "utf-8");
	let credential = JSON.parse(data);
	login = credential.link2;
	email = credential.email;
    pwd = credential.pwd;


	

	let tab = await browser.newPage();
    await tab.goto("https://twitter.com/login", {
        waitUntil : "networkidle2"
    });
    await tab.waitForSelector("input[name='session[username_or_email]']");
    await tab.type("input[name='session[username_or_email]']",email,{delay:10});
    
    await tab.waitForSelector("input[name='session[password]']");
    await tab.type("input[name='session[password]']",pwd,{delay:10});
    await tab.waitForSelector("div[role='button']");
    await navigationHelper(tab, "div[role='button']");
    console.log("1111");

    await tab.waitForSelector("input[placeholder='Search Twitter']");
    console.log("1111");
    await tab.type("input[placeholder='Search Twitter']", " The Times Of India" , {delay : 150});
    console.log("1111");
    await tab.keyboard.press("ArrowDown",{delay:100})
    console.log("1111");
    await tab.keyboard.press("ArrowDown")
    console.log("1111");
    await tab.keyboard.press("Enter")
    console.log("1111");

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
    await tab.close();



}

async function instagram(browser) {
	let data = await fs.promises.readFile(credentialFile, "utf-8");
	let credential = JSON.parse(data);
	login = credential.link;
	email = credential.email;
    pwd = credential.pwd;
    let tabi = await browser.newPage();
    
    await tabi.goto("https://www.instagram.com/accounts/login/?hl=en", {
        waitUntil : "networkidle2"
    });


	
    await tabi.waitForSelector("input[name='username']");
    await tabi.type("input[name='username']", email, {delay : 10});
    await tabi.waitForSelector("input[name='password']");
    await tabi.type("input[name='password']", pwd, {delay : 10});
    
    await tabi.waitForSelector("button[type='submit']");
    await navigationHelper(tabi, "button[type='submit']");
    
    await tabi.waitForSelector("input[placeholder='Search']");
    await tabi.type("input[placeholder='Search']", "the times of india" , {delay : 150});
   await tabi.keyboard.press("ArrowDown")
  await tabi.keyboard.press("Enter")
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
await tabi.waitForSelector('div.fuqBx a', {
    visible: true
});

await tabi.evaluate(() => {
    document.querySelector('div.fuqBx a').click()
});

let idx = 0;

do {

    await tabi.waitForSelector('article > div:nth-child(1) img[decoding="auto"]');

    let elements = await tabi.$$('article > div:nth-child(1) img[decoding="auto"]');

    let posts = elements[idx];

    await posts.click({

        delay:100

    });

    let like= await tabi.waitForSelector('span.fr66n > button.wpO6b',{
    visible:true});


    if(like){

        await like.click({delay:100});
        
    }

    let closebtn=await tabi.waitForSelector('.Igw0E button.wpO6b',{
        visible:true
    });
    console.log(idx+1 +"st"+  "post" +"like")

    await closebtn.click();
    idx++;
    
} while (idx < 1);

  await tabi.close();

}


// async function twitter(browser){
//     let tabTwitter = await browser.newPage();
//     await tabTwitter.goto("https://www.hackerrank.com", {
//         waitUntil : "networkidle2"
//     });
    
// }

// async function instagram(browser){
//     let tab = await browser.newPage();
    
//     await tab.goto("https://www.hackerrank.com", {
//         waitUntil : "networkidle2"
//     });
// }
async function navigationHelper(tab, selector){
    await Promise.all([tab.waitForNavigation({
        waitUntil : "networkidle2"
    }), tab.click(selector)]);
}