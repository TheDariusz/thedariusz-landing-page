import { Github, Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/data/siteData";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4" role="contentinfo">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href={siteData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
            <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          {siteData.footer.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
