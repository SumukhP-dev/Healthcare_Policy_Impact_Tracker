import { test, expect } from "playwright/test";

test("mortality page test", async ({ page }) => {
  await page.goto("localhost:3000");

  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});

test("infant mortality page test", async ({ page }) => {
  await page.goto("localhost:3000");

  await page.getByRole("button", { name: "Mortality" }).click();
  await page.getByText("Infant Mortality").dblclick();

  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});

test("county organized Health system page test", async ({ page }) => {
  await page.goto("localhost:3000");

  await page.getByRole("button", { name: "Mortality" }).click();
  await page.getByText("County Organized Health System").dblclick();

  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});
