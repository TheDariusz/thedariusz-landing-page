import { Download } from "lucide-react";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CVDownloadButtonProps {
  size?: "sm" | "lg" | "default" | "icon";
  className?: string;
}

const CVDownloadButton = ({ size = "default", className = "" }: CVDownloadButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className={`border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary ${className}`}
        >
          <Download className="w-4 h-4 mr-2" />
          {siteData.hero.ctaSecondary}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem asChild>
          <a href={siteData.cvLinks.en} download className="cursor-pointer">
            🇬🇧 English
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={siteData.cvLinks.pl} download className="cursor-pointer">
            🇵🇱 Polish
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CVDownloadButton;
