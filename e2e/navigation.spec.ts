import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Desktop nav", () => {
    test.skip(({ isMobile }) => isMobile, "Desktop only");

    test("nav links scroll to correct sections", async ({ page }) => {
      for (const [label, sectionId] of [
        ["About", "#about"],
        ["Skills", "#skills"],
        ["Contact", "#contact"],
      ]) {
        await page.getByRole("navigation", { name: "Main navigation" }).getByText(label).click();
        await expect(page.locator(sectionId)).toBeInViewport({ timeout: 3000 });
      }
    });

    test("logo click scrolls to top", async ({ page }) => {
      // Scroll down first
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await expect(page.locator("#contact")).toBeInViewport();

      await page.getByLabel("Home").click();
      await expect(page.locator("section").first()).toBeInViewport({ timeout: 3000 });
    });

    test("header gets backdrop blur on scroll", async ({ page }) => {
      const header = page.getByRole("banner");

      // At top — no backdrop
      await expect(header).not.toHaveClass(/backdrop-blur/);

      // Scroll down
      await page.locator("#about").scrollIntoViewIfNeeded();
      await expect(header).toHaveClass(/backdrop-blur/, { timeout: 2000 });
    });
  });

  test.describe("Mobile nav", () => {
    test.skip(({ isMobile }) => !isMobile, "Mobile only");

    test("opens and closes mobile menu", async ({ page }) => {
      await page.getByLabel("Open menu").click();
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

      await page.getByLabel("Close menu").click();
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
    });

    test("nav links scroll and close menu", async ({ page }) => {
      await page.getByLabel("Open menu").click();

      await page.getByRole("navigation", { name: "Mobile navigation" }).getByText("Contact").click();
      await expect(page.locator("#contact")).toBeInViewport({ timeout: 3000 });
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
    });
  });

  test("scroll-to-top button appears and works", async ({ page }) => {
    // Not visible at top
    await expect(page.getByLabel("Scroll to top")).not.toBeVisible();

    // Scroll down
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Scroll to top")).toBeVisible({ timeout: 3000 });

    // Click it
    await page.getByLabel("Scroll to top").click();
    await expect(page.locator("section").first()).toBeInViewport({ timeout: 3000 });
  });
});
