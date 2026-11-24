import { Download, FileText } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { resume } from "@/content/portfolio";

interface ResumeButtonProps {
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

/**
 * Downloads the real resume when `resume.url` is set in the content file.
 * Until then it renders a disabled "on request" button, never a fake download.
 */
export function ResumeButton({ label = "Download Resume", variant = "outline", size, className }: ResumeButtonProps) {
  if (!resume.url) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        disabled
        aria-disabled="true"
        title="Resume available on request"
      >
        <FileText aria-hidden="true" />
        Resume on request
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={resume.url} download={resume.fileName}>
        <Download aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
