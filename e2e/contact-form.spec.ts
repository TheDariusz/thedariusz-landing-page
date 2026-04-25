import { test, expect } from "@playwright/test";
import { fillContactForm, mockWebhook } from "./helpers";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test.describe("Validation", () => {
    test("shows errors on empty submit", async ({ page }) => {
      await page.getByRole("button", { name: "Send Message" }).click();

      await expect(page.getByText("Name is required")).toBeVisible();
      await expect(page.getByText("Please enter a valid email")).toBeVisible();
      await expect(page.getByText("Message is required")).toBeVisible();
    });

    test("shows email format error", async ({ page }) => {
      await fillContactForm(page, {
        name: "John",
        email: "not-an-email",
        message: "Hello",
      });

      await page.getByRole("button", { name: "Send Message" }).click();
      await expect(page.getByText("Please enter a valid email")).toBeVisible();
    });

    test("clears error when user types", async ({ page }) => {
      await page.getByRole("button", { name: "Send Message" }).click();
      await expect(page.getByText("Name is required")).toBeVisible();

      await page.getByLabel("Your name").fill("John");
      await expect(page.getByText("Name is required")).not.toBeVisible();
    });
  });

  test.describe("Submission", () => {
    test("successful submit shows toast and clears form", async ({ page }) => {
      await mockWebhook(page, { status: 200 });

      await fillContactForm(page, {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there!",
      });

      await page.getByRole("button", { name: "Send Message" }).click();

      await expect(page.getByText("Message sent!", { exact: true })).toBeVisible();
      await expect(page.getByLabel("Your name")).toHaveValue("");
      await expect(page.getByLabel("Your email")).toHaveValue("");
      await expect(page.getByLabel("Your message")).toHaveValue("");
    });

    test("failed submit (500) shows error toast and preserves form", async ({ page }) => {
      await mockWebhook(page, { status: 500 });

      await fillContactForm(page, {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there!",
      });

      await page.getByRole("button", { name: "Send Message" }).click();

      await expect(page.getByText("Something went wrong", { exact: true })).toBeVisible();
      await expect(page.getByLabel("Your name")).toHaveValue("John Doe");
    });

    test("network error shows error toast and preserves form", async ({ page }) => {
      await mockWebhook(page, { abort: true });

      await fillContactForm(page, {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there!",
      });

      await page.getByRole("button", { name: "Send Message" }).click();

      await expect(page.getByText("Something went wrong", { exact: true })).toBeVisible();
      await expect(page.getByLabel("Your name")).toHaveValue("John Doe");
    });

    test("shows loading state while submitting", async ({ page }) => {
      // Mock webhook that never resolves (until test ends)
      await page.route("**/webhook/**", () => {
        // Don't fulfill — keeps the request pending
      });

      await fillContactForm(page, {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there!",
      });

      await page.getByRole("button", { name: "Send Message" }).click();

      await expect(page.getByRole("button", { name: "Sending..." })).toBeVisible();
      await expect(page.getByLabel("Your name")).toBeDisabled();
      await expect(page.getByLabel("Your email")).toBeDisabled();
      await expect(page.getByLabel("Your message")).toBeDisabled();
    });
  });
});
