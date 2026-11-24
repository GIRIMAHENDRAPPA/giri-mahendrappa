import { Link } from "@tanstack/react-router";
import { navItems, profile } from "@/content/portfolio";
import { LogoMark } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="font-display font-semibold text-foreground">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.titleLong}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-muted-foreground">
            Designed and built with curiosity, creativity, and code.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link to="/" hash={item.id} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks />
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-5 font-mono text-xs text-muted-foreground sm:px-8">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
