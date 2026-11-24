import { Award, ExternalLink, FileText } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { certifications } from "@/content/portfolio";

export function Certifications() {
  return (
    <Section id="certifications" index="05" title="Certifications & Achievements">
      {certifications.length === 0 ? (
        <Reveal>
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border-strong p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Award className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">Verified credentials coming soon</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Certifications and achievements will appear here as they're earned and verified.
              </p>
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={`${c.title}-${i}`} delay={i * 0.05}>
              <article className="surface-card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <Award className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                <dl className="mt-4 space-y-1 font-mono text-xs text-muted-foreground">
                  {c.date ? (
                    <div>
                      <dt className="inline">Issued: </dt>
                      <dd className="inline text-foreground">{c.date}</dd>
                    </div>
                  ) : null}
                  {c.credentialId ? (
                    <div>
                      <dt className="inline">Credential ID: </dt>
                      <dd className="inline text-foreground">{c.credentialId}</dd>
                    </div>
                  ) : null}
                </dl>
                <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
                  {c.verifyUrl ? (
                    <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <ExternalLink className="size-3.5" aria-hidden="true" /> Verify
                    </a>
                  ) : null}
                  {c.fileUrl ? (
                    <a href={c.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <FileText className="size-3.5" aria-hidden="true" /> Certificate
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
