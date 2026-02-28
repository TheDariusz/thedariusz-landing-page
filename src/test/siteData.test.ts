import { describe, it, expect } from "vitest";
import { siteData } from "@/data/siteData";

describe("siteData", () => {
  it("has required top-level fields", () => {
    expect(siteData.name).toBeTruthy();
    expect(siteData.email).toContain("@");
    expect(siteData.socialLinks.github).toMatch(/^https?:\/\//);
    expect(siteData.socialLinks.linkedin).toMatch(/^https?:\/\//);
    expect(siteData.socialLinks.twitter).toMatch(/^https?:\/\//);
  });

  it("has navigation links with valid anchors", () => {
    expect(siteData.navLinks.length).toBeGreaterThan(0);
    siteData.navLinks.forEach((link) => {
      expect(link.href).toMatch(/^#/);
      expect(link.label).toBeTruthy();
    });
  });

  it("has skill categories with items", () => {
    expect(siteData.skills.categories.length).toBeGreaterThan(0);
    siteData.skills.categories.forEach((cat) => {
      expect(cat.name).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(cat.items.length).toBeGreaterThan(0);
    });
  });

  it("has stats entries", () => {
    expect(siteData.stats.length).toBeGreaterThan(0);
    siteData.stats.forEach((stat) => {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
    });
  });

  it("has CV links for both languages and formats", () => {
    expect(siteData.cvLinks.en.pdf).toMatch(/\.pdf$/);
    expect(siteData.cvLinks.en.md).toMatch(/\.md$/);
    expect(siteData.cvLinks.pl.pdf).toMatch(/\.pdf$/);
    expect(siteData.cvLinks.pl.md).toMatch(/\.md$/);
  });
});
