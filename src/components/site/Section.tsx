import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  tone?: "base" | "surface";
}

export function Section({ id, index, title, subtitle, children, className, tone = "base" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "scroll-mt-20 py-24 sm:py-32",
        tone === "surface" && "border-y border-border bg-surface/50",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow">
            <span className="text-muted-foreground">{index} /</span> {id}
          </p>
          <h2 id={`${id}-title`} className="mt-4 text-3xl font-semibold text-foreground sm:text-5xl">
            {title}
          </h2>
          {subtitle ? <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
