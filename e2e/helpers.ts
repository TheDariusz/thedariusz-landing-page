import type { Page } from "@playwright/test";

const WEBHOOK_URL = "https://n8n.thedariusz.com/webhook/972def4a-2294-400f-a8f4-72df7db8e442";

export async function fillContactForm(
  page: Page,
  { name, email, message }: { name: string; email: string; message: string },
) {
  await page.getByLabel("Your name").fill(name);
  await page.getByLabel("Your email").fill(email);
  await page.getByLabel("Your message").fill(message);
}

export async function mockWebhook(
  page: Page,
  options: { status?: number; abort?: boolean } = {},
) {
  await page.route(`**/${WEBHOOK_URL.split("/webhook/")[1]}`, (route) => {
    if (options.abort) {
      return route.abort("connectionrefused");
    }
    return route.fulfill({
      status: options.status ?? 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}
