import { Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { education, training } from "@/content/portfolio";

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 font-mono text-[0.7rem] text-primary">{children}</span>
  );
}

export function Education() {
  return (
    <Section id="education" index="04" title="Education" subtitle="My Academic Journey" tone="surface">
      <ol className="relative ml-4 border-l border-border-strong">
        {education.map((entry, i) => (
          <li key={`${entry.qualification}-${i}`} className="relative pb-8 pl-8 last:pb-0 sm:pl-12">
            <span className="absolute -left-4 top-1 inline-flex size-8 items-center justify-center rounded-full border border-primary/40 bg-background text-primary">
              <GraduationCap className="size-4" aria-hidden="true" />
            </span>
            <Reveal delay={i * 0.08}>
              <div className="surface-card p-6 transition-colors duration-300 hover:border-primary/40 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  {entry.duration ? (
                    <span className="font-mono text-xs text-muted-foreground">{entry.duration}</span>
                  ) : null}
                  {entry.status ? <Badge>{entry.status}</Badge> : null}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">{entry.qualification}</h3>
                <p className="mt-1 text-base text-foreground">{entry.institution}</p>
                {entry.specialization ? (
                  <p className="mt-3 text-sm text-muted-foreground">{entry.specialization}</p>
                ) : null}
                {entry.score ? <p className="mt-3 font-mono text-sm text-foreground">{entry.score}</p> : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {training.length > 0 ? (
        <div className="mt-16">
          <Reveal>
            <h3 className="eyebrow mb-6">Internship & Training</h3>
          </Reveal>
          <div className="grid gap-5">
            {training.map((t) => (
              <Reveal key={`${t.role}-${t.organization}`}>
                <article className="surface-card p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Briefcase className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">{t.role}</p>
                        <p className="text-sm text-muted-foreground">{t.organization}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{t.duration}</span>
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </Section>
  );
}
