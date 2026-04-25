import { test, expect } from "@playwright/test";

test.describe("CV download dropdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens dropdown and shows 4 download items", async ({ page }) => {
    await page.getByRole("button", { name: "Download CV" }).first().click();

    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    const items = menu.getByRole("menuitem");
    await expect(items).toHaveCount(4);
  });

  test("download links have correct href and download attributes", async ({ page }) => {
    await page.getByRole("button", { name: "Download CV" }).first().click();

    const menu = page.getByRole("menu");

    const expectedLinks = [
      { text: "PDF", href: "/Dariusz_Szczepanski_resume-en.pdf" },
      { text: "Markdown", href: "/Dariusz_Szczepanski_resume-en.md" },
      { text: "PDF", href: "/Dariusz_Szczepanski_resume-pl.pdf" },
      { text: "Markdown", href: "/Dariusz_Szczepanski_resume-pl.md" },
    ];

    const items = menu.getByRole("menuitem");
    for (let i = 0; i < expectedLinks.length; i++) {
      const item = items.nth(i);
      await expect(item).toHaveAttribute("href", expectedLinks[i].href);
      await expect(item).toHaveAttribute("download", "");
    }
  });
});
