import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header mobile menu", () => {
  it("exposes its open state on the toggle", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the toggle", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});
