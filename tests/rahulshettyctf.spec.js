const { test, expect } = require("@playwright/test");
const { getLocators } = require("./constants/data.config");
/* 

  End To End Testing with Playwright For Homework 
  Use Rahulshetty.com client login page and then Select a product and add to cart and then checkout and validate the order id in the orders page

  1. Login Flow Test if the Login is Successfull or not ?
  2. Add to Cart => Add the Product to the Cart Validate if the Same Product is getting added to the Cart or not ?
  3. Place the Order => Fill all the details and place the order\
  4. Validate if rahulshettyacademy coupon is applied or not ?
  5. Capture the Order ID and take a screenshot of the order id
  6. Go to the Orders Page and Validate if the Order is present in the Orders Page or not ?
  4. Validate the Order in the Orders Page => Check if the Order is present in the Orders Page or not ?
*/

test.describe("E2E Test", () => {
  test("Login Flow Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await email.fill("aryan2001sehgal@gmail.com");
    await pwd.fill("Semester@77");
    await login.click();
    expect(await page.locator(".overaly-container").toBeVisible());
  });

  test.only("Adding the Product to the cart", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    const { email, pwd, login } = getLocators(page);

    await email.fill("aryan2001sehgal@gmail.com");
    await pwd.fill("Semester@77");
    await login.click();

    const arr = await page.locator(".card-body b").allTextContents();
    const count = arr.count();
    for (let i = 0; i < count; i++) {
      const prod = await arr.nth(i).textContent();
      if (prod === "zara coat 3") {
        await arr.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  });

  test("validating the Order added to the cart is same as the selected product", async ({
    page,
  }) => {});

  test("Placing the Order", async ({ page }) => {});

  test("Validating the Coupon is applied or not", async ({ page }) => {});

  test("Capture the Order ID and take a screenshot of the order id", async ({
    page,
  }) => {});

  test("Go to the Orders Page and Validate if the Order is present in the Orders Page or not ?", async ({
    page,
  }) => {});
});
