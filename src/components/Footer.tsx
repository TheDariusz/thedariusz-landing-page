import { Github, Linkedin, Twitter, Briefcase } from "lucide-react";
import { siteData } from "@/data/siteData";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4" role="contentinfo">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Business Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Business Info
              </h3>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p className="text-secondary-foreground">{siteData.business.name}</p>
              <p>NIP: {siteData.business.nip}</p>
              <p>{siteData.business.address}</p>
              <p>{siteData.business.email}</p>
              <p>{siteData.business.phone}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start md:items-end justify-end gap-4">
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
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            {siteData.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
