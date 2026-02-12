import { Github, Linkedin } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

import { siteData } from "@/data/siteData";

interface SocialLinksProps {
  showLabels?: boolean;
  iconClassName?: string;
  className?: string;
}

const socialItems = [
  { href: siteData.socialLinks.github, label: "GitHub", icon: Github },
  { href: siteData.socialLinks.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteData.socialLinks.twitter, label: "X (Twitter)", displayLabel: "X", icon: XIcon },
];

const SocialLinks = ({ showLabels = false, iconClassName = "w-5 h-5", className = "" }: SocialLinksProps) => (
  <>
    {socialItems.map(({ href, label, displayLabel, icon: Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
      >
        <Icon className={iconClassName} />
        {showLabels && <span className="text-sm">{displayLabel || label}</span>}
      </a>
    ))}
  </>
);

export default SocialLinks;
