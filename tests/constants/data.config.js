// import { test, expect } from "@playwright/test";

// test("globals", async ({ page }) => {
//   await page.goto("https://rahulshettyacademy.com/client");
//   const email = page.locator("[formcontrolname='userEmail']");
//   const pwd = page.locator("[formcontrolname='userPassword']");
//   const login = page.locator("#[name='login']");
//   const product = page.locator(".card-body b").first();
// });


// data.config.js
exports.getLocators = function(page) {
  return {
    email: page.locator("[formcontrolname='userEmail']"),
    pwd: page.locator("[formcontrolname='userPassword']"),
    login: page.locator("button[type='submit']")
  }
};

