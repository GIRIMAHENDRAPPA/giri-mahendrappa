import { useServerFn } from "@tanstack/react-start";
import { CircleAlert, CircleCheck, Github, Linkedin, LoaderCircle, Mail, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/content/portfolio";
import { contactSchema, type ContactInput } from "@/lib/contact.schema";
import { submitContact } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof ContactInput, string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const empty: ContactInput = { fullName: "", email: "", subject: "", message: "" };

const fields: { name: keyof ContactInput; label: string; type?: string; autoComplete?: string }[] = [
  { name: "fullName", label: "Full Name", autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject" },
];

export function Contact() {
  const send = useServerFn(submitContact);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (name: keyof ContactInput, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (status.kind === "success" || status.kind === "error") setStatus({ kind: "idle" });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await send({ data: { ...parsed.data, website: honeypot, startedAt: startedAt.current || Date.now() - 10000 } });
      setStatus({ kind: "success" });
      setValues(empty);
      startedAt.current = Date.now();
    } catch (err) {
      const message =
        err instanceof Error && err.message && !err.message.startsWith("[")
          ? err.message
          : "Something went wrong while sending. Please try again or email me directly.";
      setStatus({ kind: "error", message });
    }
  };

  const sending = status.kind === "sending";

  return (
    <Section
      id="contact"
      index="07"
      title="Let's Connect"
      subtitle="Have an opportunity, project idea, or just want to connect? I'd love to hear from you."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { icon: Github, label: "GitHub", value: `github.com/${profile.githubUsername}`, href: profile.github, external: true },
            { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/girimahendrappa", href: profile.linkedin, external: true },
          ].map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="surface-card group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">{label}</span>
                <span className="block truncate text-sm text-foreground transition-colors group-hover:text-primary">{value}</span>
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="surface-card relative space-y-5 p-6 sm:p-8" aria-describedby="contact-status">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={cn("space-y-2", f.name === "subject" && "sm:col-span-2")}>
                  <Label htmlFor={`contact-${f.name}`} className="text-sm text-foreground">
                    {f.label} <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id={`contact-${f.name}`}
                    name={f.name}
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    value={values[f.name]}
                    onChange={(e) => update(f.name, e.target.value)}
                    aria-invalid={Boolean(errors[f.name])}
                    aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
                    disabled={sending}
                    className="h-11 rounded-xl border-input bg-background/60"
                  />
                  {errors[f.name] ? (
                    <p id={`contact-${f.name}-error`} className="text-xs text-destructive">{errors[f.name]}</p>
                  ) : null}
                </div>
              ))}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="contact-message" className="text-sm text-foreground">
                  Message <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  disabled={sending}
                  className="rounded-xl border-input bg-background/60"
                />
                {errors.message ? (
                  <p id="contact-message-error" className="text-xs text-destructive">{errors.message}</p>
                ) : null}
              </div>
            </div>

            {/* Honeypot — hidden from people and screen readers */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div id="contact-status" role="status" aria-live="polite" className="text-sm">
                {status.kind === "success" ? (
                  <p className="flex items-center gap-2 text-success">
                    <CircleCheck className="size-4" aria-hidden="true" /> Thanks — your message was received. I'll get back to you soon.
                  </p>
                ) : status.kind === "error" ? (
                  <p className="flex items-center gap-2 text-destructive">
                    <CircleAlert className="size-4 shrink-0" aria-hidden="true" /> {status.message}
                  </p>
                ) : null}
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={sending} className="shrink-0">
                {sending ? (
                  <>
                    <LoaderCircle className="animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" /> Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
