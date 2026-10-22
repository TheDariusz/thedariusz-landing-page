import { Download, FileText, FileCode } from "lucide-react";
import { siteData } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
          className={`rounded-full border-border bg-transparent text-foreground hover:bg-card hover:border-subtle ${className}`}
        >
          <Download className="w-4 h-4 mr-2" />
          {siteData.hero.ctaSecondary}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[160px]">
        <DropdownMenuLabel className="text-muted-foreground">
          🇬🇧 English
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href={siteData.cvLinks.en.pdf} download className="cursor-pointer">
            <FileText className="w-4 h-4" />
            PDF
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={siteData.cvLinks.en.md} download className="cursor-pointer text-muted-foreground">
            <FileCode className="w-4 h-4" />
            Markdown
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-muted-foreground">
          🇵🇱 Polish
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href={siteData.cvLinks.pl.pdf} download className="cursor-pointer">
            <FileText className="w-4 h-4" />
            PDF
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={siteData.cvLinks.pl.md} download className="cursor-pointer text-muted-foreground">
            <FileCode className="w-4 h-4" />
            Markdown
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CVDownloadButton;
