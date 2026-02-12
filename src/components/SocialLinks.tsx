import { Github, Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/data/siteData";

interface SocialLinksProps {
  showLabels?: boolean;
  iconClassName?: string;
  className?: string;
}

const socialItems = [
  { href: siteData.socialLinks.github, label: "GitHub", icon: Github },
  { href: siteData.socialLinks.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteData.socialLinks.twitter, label: "Twitter / X", displayLabel: "Twitter", icon: Twitter },
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
