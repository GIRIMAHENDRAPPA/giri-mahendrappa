import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile, type SectionId } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { LogoMark } from "./Logo";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";

/** Tracks which section is in view (only meaningful on the home page). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId>("home");
  useEffect(() => {
    if (!enabled) return;
    const els = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top) setActive(top.target.id as SectionId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  return active;
}

export function Navbar({ onHome = true }: { onHome?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(onHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "surface-glass border-b border-border" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" hash="home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="font-display text-[0.95rem] font-semibold tracking-tight text-foreground">
            {profile.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to="/"
                hash={item.id}
                data-active={onHome && active === item.id}
                className={cn(
                  "link-underline text-sm transition-colors hover:text-foreground",
                  onHome && active === item.id ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ResumeButton variant="outline" size="sm" className="hidden sm:inline-flex" label="Resume" />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border xl:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to="/"
                    hash={item.id}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-base transition-colors hover:bg-accent",
                      onHome && active === item.id ? "text-primary" : "text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 px-3 sm:hidden">
                <ResumeButton className="w-full" />
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
