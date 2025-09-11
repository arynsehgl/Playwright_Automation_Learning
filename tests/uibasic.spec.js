const { test, expect } = require("@playwright/test");

test("Broser Context Declaration", async ({ browser }) => {
  // Playwright Code
  /*
        Javascript is Asynchronous no sequence.
        Step 1: Open browser
        Step 2: Enter something
        Step 3: Click
        JS would try to do everything at once
        we have to tell every step to wait to move to next 
        so we use the keyword await until this step is done we need to mention async before the 
        function else this await won't work
        if function has no name its anonymous so in such a function we don't need to type anything
        we can use async ()=> instead of async function(){};
    

        There is a fixture called browser need to add in the async(browser) this test know that 
        there is sonething called browser so these are global fixture so we need to invoke 
        we have to therefore wrap in curly braces async ({browser}) These are global
        so no need to add anything on top to important


        we have to create a fresh browser 
        browser.newContext() this would be fresh just like incognito
        start a new instance with fixed properties so we can inject cookies or proxy in the conteext()
        const context = browser.newContext() there are let or Const learn about it the difference
        This upper line will open a browser fresh file.
        whatever browser we do in the playwright config it will open that
        To create first page we need    
        context.newPage();
        on this new page we hit url and start the automation
        we will be using await before both the steps 
        because if not then it will try to create a page before even browser loads
        const page = await context.newPage();



        to go to a url
        page.goto("URLlink");
        again await page.goto('url) else it will cause error
        we can prevent the two lines by putting a default global fixture page in the top
        async ({browser, page}) => 
    */

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.instagram.com/");

  // up and down are same things only one using fixture of page and one doing it manually
});

test("Page playwright test", async ({ page }) => {
  await page.goto("https://www.google.com/");
});

/* 
    test.only would do only that when you use npx playwright test
*/

/* 

    Test to Check title of the Google page 
    There are Hardly 25 Assertions we need to learn
*/

test("Title Verification", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title);

  await expect(page).toHaveTitle("Google");
});

/* 
 
    CSS and XPATH are the Selectors that help playwright to do or identify things

    in the Rahutshetty,com/loginpagePractise

    now the Login Box have 4 attributes 
    ID ==> then we can generate CSS with input#username
    name
    Type
    Class ==> input.form-control

    [name = 'username] ==> everlasting verify with ChroPath
 
 */

test("login Test failed error validation", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");
  await page.locator("[name = 'username']").fill("rahulshettyacadem");
  await page.locator("[name = 'password']").fill("learning");
  await page.locator("[name = 'signin']").click();

  /* 
        So here basically what is happening is on Clicking Submit it is throwing error message thats a toast
        the attribute style for it is changing display from none to block. so we will use this Playwright thing 
        for the workaround

        Text Content will extract the Content of that Css
    */
  await expect(page.locator("[style*= 'block']")).toContainText("Incorrect");
});

test("Login Error Checking using the stored locators", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");

  const username = page.locator("[name = 'username']");
  const password = page.locator("[name = 'password']");
  const signin = page.locator("[name = 'signin']");
  const effchng = page.locator("[style*='block']");

  await username.fill("rahulshettyacadem");
  await password.fill("learning");
  await signin.click();
  await expect(effchng).toContainText("Incorrect");
});

// To Traverse inside a DIV what to do?
/* 
    .class-name child tag name here a;
*/

test("multiple attribute same", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");

  const username = page.locator("[name = 'username']");
  const password = page.locator("[name = 'password']");
  const signin = page.locator("[name = 'signin']");
  const effchng = page.locator("[style*='block']");

  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await signin.click();

  // const ipx = page.locator(".card-body a");
  console.log(await page.locator(".card-body a").nth(0).textContent()); //This will give Iphone X since the array will be there and it will return the first one
  console.log(await page.locator(".card-body a").first().textContent()); // This will return the First one for last we can use last for in between use nth

  // lets say we want to add all of the things Products etc.
  const cardtitle = page.locator(".card-body a");
  console.log(await cardtitle.nth(1).textContent());
  const alltitle = await cardtitle.allTextContents();

  console.log(alltitle);

  /* 
    Now for the Textcontent we have autowaiting feature by playwright so it will wait until that locator is attached to the DOM 
    but for alltextcontent its not really adding anything up so we need something workaround
    This is returning array array can have 0 or 100 elements. if it loads even without wait it return 0 element array which is valid so it passes
    but this is flaky.

    it is working here because first element was found first for that it already has waiting period whatever we set like 40s so then when we use alltextcontent it return 0 
    so thats the issue.
  */
});

test("Automation homework", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const email = page.locator("[formcontrolname='userEmail']");
  const pwd = page.locator("[formcontrolname='userPassword']");
  const login = page.locator("[name='login']");

  await email.fill("aryan2001sehgal@gmail.com");
  await pwd.fill("Semester@77");
  await login.click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/#/dashboard/dash"
  );
});

test("Getting all the Products on the Homework page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#auth/login");
  const email = page.locator("[formcontrolname='userEmail']"); // We can also use #userEmail and #userPassword
  const pwd = page.locator("[formcontrolname='userPassword']");
  const login = page.locator("[name='login']");

  await email.fill("aryan2001sehgal@gmail.com");
  await pwd.fill("Semester@77");
  await login.click();

  const identif = page.locator('h5[style*="text-transform"] b');
  // console.log(await identif.first().textContent()); Commenting it out post the below code because this is not the right way of doing things we just want all content

  console.log(await identif.allTextContents());

  // There is also a API wherein we get all the data from a Particular website so we can use that as well. we have to wait until all calls are made. Login Call and then 2s
  // Product Call is madee

  // await page.waitForLoadState("networkidle"); // we put the wait here and now we can uset allTextContents without the first text content.
  await identif.first().waitFor();
  console.log(await identif.allTextContents());

  /* 
    The above Networkidle waitForLoadState can be a little flaky sometimes
    better is to call that particular locator.waitFor(); so it will wait until that locator is loaded Completely and then we can Proceed on to gettting wnatev we want
    wait for is to be used only for one locator identif above is returning 3 or something so it won't work we can use first() or last()
  */
});

test("This test is for Radio buttons etc selecting dropdown", async ({
  page,
}) => {
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

  const username = page.locator("[name = 'username']");
  const password = page.locator("[name = 'password']");

  const dropdown = page.locator("select.form-control");

  await dropdown.selectOption("consult");
  // await page.pause(); //This will open a playwright inspector and the ui would be paused

  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await page.locator(".radiotextsty").last().click();

  await page.locator("#okayBtn").click();

  // To actually check if radio button is selected

  await expect(page.locator(".radiotextsty")).last().toBeChecked(); // This is assertion

  //If we use Console.log we can do console.log(await page.locator(".radiotextsty").last().isChecked());

  // To Uncheck it we don't have an assertion so what we can do is to check with the same isChecked method and add .toBeFalse(); using expect assertion basically
  // we are expectin it to return false to us there is also toBeTruthy to check for True
});

/* 
   when we are storing a locator in variable we don't use await and in expect also we use await inside expect 
   because we want the await only to be used before any action is performed

*/

// To Check if the text is blinking or not

test("This is to test for the blinking of the thing on the webpage", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  const blinker = page.locator(".blink_me");
  await expect(blinker).toHaveAttribute("class", "blink_me");
});

// To Check if on Clicking thaat Blinking text it is taking to some different page so this new page new tab have a certain text or not is something we need to test

test("Child Tab handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  const email = page.locator("[formcontrolname='userEmail']"); // We can also use #userEmail and #userPassword
  const pwd = page.locator("[formcontrolname='userPassword']");
  const login = page.locator("[name='login']");

  await email.fill("aryan2001sehgal@gmail.com");
  await pwd.fill("Semester@77");
  await login.click();

  const blinker = page.locator("[href='https://qasummit.org/']");

  // blinker.click();

  // Here our scope of testing is only that page. page which we have defined on the top

  /*
    we need to move to a new page so we need to use a work around
  */

  // const npg = context.waitForEvent('page'); // To listen for a new page if being opened now we can use npg as new page
  // we have promise  pending rejected fulfilled

  /* 
  
    So now in the aboev context. waitforEvent wala thing if we have it like the same and then we in next line add blinker click wala thing
    if we put await in that step or make that step uppr ya neeche it doesn't matter it wont help us.
    Phele await kar lega and then it will be like no page move to next step and then new page opened koi fayda nahi

    later if we move that step down tab bhi nahi fayda we want ki dono step parallel ho toh for that we use promise
    yeh Promise wala will keep on executing until it is fulfilled and if rejected to woh script failed 
  */

  const [npg] = await Promise.all([
    context.waitForEvent("page"),
    blinker.click(),
  ]);

  // now we can use npg.locator etc

  const text = npg.locator(".hero_register_btn");
  const contents = await text.textContent();
  console.log(contents);
});

/* 
  So we are trying to understand here the difference between textContent and input value
  To Check the value that got added later by us we cannot get by textContent we have to use input value
  Basically anything in DOM we can grab using textContent but if it is something that is entered by user or by us we have to use inputValue
*/

test("To check the value entered in the input field", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const email = page.locator("[name='username']");
  await email.fill("aryan2001sehgal@gmail.com");
  const value = await email.inputValue();
  console.log(value);
});

/* 
  Playwright Inspector and Debugging
   npx playwright test --debug this will open the debugger playwright inspector and it will help us go step
   by step and see what is happening
*/


