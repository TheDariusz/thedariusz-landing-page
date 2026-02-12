import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Index from "@/pages/Index";

describe("Index page", () => {
  it("renders all main sections", () => {
    render(<Index />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByLabelText("Introduction")).toBeInTheDocument();
    expect(screen.getByLabelText("Key highlights")).toBeInTheDocument();
    expect(screen.getByLabelText("About Me")).toBeInTheDocument();
    expect(screen.getByLabelText("Skills and Technologies")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays the site owner name", () => {
    render(<Index />);
    expect(screen.getByText("Dariusz Szczepański")).toBeInTheDocument();
  });
});
