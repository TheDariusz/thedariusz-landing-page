import { test, expect } from "@playwright/test";

test.describe("Content and layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("all main sections are present", async ({ page }) => {
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("hero shows name and tagline", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dariusz Szczepański");
    await expect(page.getByText("Software Engineer | Backend & Integration Specialist")).toBeVisible();
  });

  test("projects link to the live apps in a new tab", async ({ page }) => {
    const projects = page.locator("#projects");
    const expected = ["https://ai-cards.app", "https://2doai.app", "https://crisisassistant.app"];

    const textLinks = projects.getByRole("link");
    await expect(textLinks).toHaveText(expected.map((url) => `${new URL(url).hostname} ↗`));
    for (const [i, url] of expected.entries()) {
      const link = textLinks.nth(i);
      await expect(link).toHaveAttribute("href", url);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }

    const screenshotLinks = projects.locator('a[aria-hidden="true"]');
    await expect(screenshotLinks).toHaveCount(3);
    for (const link of await screenshotLinks.all()) {
      await expect(link).toHaveAttribute("tabindex", "-1");
    }
  });

  test("all 7 skill categories render", async ({ page }) => {
    await page.locator("#skills").scrollIntoViewIfNeeded();

    const categories = ["Backend", "Data & ORM", "Data Analysis & Reporting", "DevOps & Tools", "Testing", "Management & Business", "AI"];

    for (const name of categories) {
      await expect(page.locator("#skills").getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("footer shows copyright with current year", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText(`© ${new Date().getFullYear()}`);
    await expect(footer).toContainText("TheDariusz");
  });

  test.describe("Responsive layout", () => {
    test("mobile hides desktop nav", async ({ page, isMobile }) => {
      test.skip(!isMobile, "Mobile only");

      await expect(page.getByRole("navigation", { name: "Main navigation" })).not.toBeVisible();
      await expect(page.getByLabel("Open menu")).toBeVisible();
    });

    test("desktop hides hamburger", async ({ page, isMobile }) => {
      test.skip(isMobile, "Desktop only");

      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
      await expect(page.getByLabel("Open menu")).not.toBeVisible();
    });
  });
});
