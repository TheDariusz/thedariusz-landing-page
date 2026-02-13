import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactSection from "@/components/ContactSection";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("ContactSection form validation", () => {
  it("shows validation errors when submitting empty form", () => {
    render(<ContactSection />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Your email"), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Hello" } });

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

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello there" } });

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

    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Your email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Hello there" } });

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

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello there" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // After error, form should still have the user's data so they can retry
    await waitFor(() => {
      expect(nameInput.value).toBe("John");
      expect(emailInput.value).toBe("john@example.com");
      expect(messageInput.value).toBe("Hello there");
    });
  });

  it("disables inputs while submitting", async () => {
    let resolveRequest: (value: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    });
    vi.spyOn(globalThis, "fetch").mockReturnValue(pending);
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Your email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Hello there" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByLabelText("Your name")).toBeDisabled();
      expect(screen.getByLabelText("Your email")).toBeDisabled();
      expect(screen.getByLabelText("Your message")).toBeDisabled();
      expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    });

    // Resolve the request to clean up
    resolveRequest!(new Response("OK", { status: 200 }));
  });
});
