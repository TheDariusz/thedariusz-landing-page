import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactSection from "@/components/ContactSection";

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

  it("resets form after successful submission", () => {
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Your name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Your email") as HTMLInputElement;
    const messageInput = screen.getByLabelText("Your message") as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello there" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
  });
});
