import { Github, Linkedin, Mail, User } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { profile } from "@/content/portfolio";

export function About() {
  const rows = [
    { icon: User, label: "Name", value: profile.name },
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: "GitHub", value: `@${profile.githubUsername}`, href: profile.github, external: true },
    { icon: Linkedin, label: "LinkedIn", value: "in/girimahendrappa", href: profile.linkedin, external: true },
  ];

  return (
    <Section
      id="about"
      index="01"
      title="About Me"
      subtitle="Curious Mind. Passion for Technology. Driven by Innovation."
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? "text-foreground" : undefined}>
              {p}
            </p>
          ))}

          <ul className="flex flex-wrap gap-2 pt-4" aria-label="Interests">
            {profile.interests.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="surface-card p-6 sm:p-8" aria-label="Profile">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-soft font-display text-xl font-bold text-primary">
                GM
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.titleLong}</p>
              </div>
            </div>
            <dl className="mt-6 space-y-4">
              {rows.map(({ icon: Icon, label, value, href, external }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">{label}</dt>
                    <dd className="truncate text-sm text-foreground">
                      {href ? (
                        <a
                          href={href}
                          className="transition-colors hover:text-primary"
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
