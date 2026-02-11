import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import CVDownloadButton from "@/components/CVDownloadButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg shadow-background/50" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 text-lg font-light tracking-tight" aria-label="Home">
          <span className="text-muted-foreground">{siteData.logo.prefix}</span>
          <span className="inline-block w-[7px] h-[7px] bg-primary rounded-[1px] mx-[3px] self-end mb-[5px]" aria-hidden="true" />
          <span className="text-foreground font-semibold">{siteData.logo.main}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {siteData.navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={siteData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
            <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <CVDownloadButton size="sm" className="ml-2" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4" aria-label="Mobile navigation">
            {siteData.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href={siteData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                <Twitter className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
            <CVDownloadButton size="sm" className="w-fit" />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
