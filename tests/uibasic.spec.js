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

test.only("Login Error Checking using the stored locators", async () => {
  await page.goto("http://www.rahulshettyacademy.com/loginpagePractise/");

  const username = page.locator("[name = username]");
  const password = page.locator("[name = password");
  const signin = page.locator("name = signin");
  const effchng = page.locator("style*=block");

  await username.fill("rahulshettyacadem");
  await password.fill("learning");
  await signin.click();
  await expect(effchng).toContainText("Incorrect");
});
