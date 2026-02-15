import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ContactSection from "@/components/ContactSection";

beforeEach(() => {
  vi.restoreAllMocks();
});

function fillForm(name = "John", email = "john@example.com", message = "Hello there") {
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: name } });
  fireEvent.change(screen.getByLabelText("Your email"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Your message"), { target: { value: message } });
}

describe("ContactSection form validation", () => {
  it("shows validation errors when submitting empty form", () => {
    render(<ContactSection />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", () => {
    render(<ContactSection />);
    fillForm("John", "not-an-email", "Hello");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
  });

  it("clears field error when user starts typing", () => {
    render(<ContactSection />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText("Name is required")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "J" } });
    expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
  });

  it("does not call webhook when validation fails", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ContactSection />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("ContactSection form submission", () => {
  it("resets form after successful submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("OK", { status: 200 }));
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Your name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Your email") as HTMLInputElement;
    const messageInput = screen.getByLabelText("Your message") as HTMLTextAreaElement;

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(messageInput.value).toBe("");
    });
  });

  it("sends correct payload to webhook", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("OK", { status: 200 }));
    render(<ContactSection />);

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/webhook/"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "John", email: "john@example.com", message: "Hello there" }),
        }),
      );
    });
  });

  it("preserves form data when webhook fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Your name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Your email") as HTMLInputElement;
    const messageInput = screen.getByLabelText("Your message") as HTMLTextAreaElement;

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe("John");
      expect(emailInput.value).toBe("john@example.com");
      expect(messageInput.value).toBe("Hello there");
    });
  });

  it("preserves form data when webhook returns non-2xx", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 500 }));
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Your name") as HTMLInputElement;

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe("John");
    });
  });

  it("disables inputs while submitting", async () => {
    let resolveRequest: (value: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    });
    vi.spyOn(globalThis, "fetch").mockReturnValue(pending);
    render(<ContactSection />);

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByLabelText("Your name")).toBeDisabled();
      expect(screen.getByLabelText("Your email")).toBeDisabled();
      expect(screen.getByLabelText("Your message")).toBeDisabled();
      expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    });

    await act(async () => {
      resolveRequest!(new Response("OK", { status: 200 }));
    });
  });
});
