import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-xl border border-border-strong bg-surface font-display text-sm font-bold tracking-tight text-foreground",
        className,
      )}
    >
      G<span className="text-primary">M</span>
    </span>
  );
}
