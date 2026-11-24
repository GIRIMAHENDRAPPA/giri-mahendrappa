import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { resume } from "@/content/portfolio";

export function ResumeCta() {
  return (
    <section aria-labelledby="resume-title" className="py-24 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="surface-card relative overflow-hidden p-8 sm:p-14">
            <div aria-hidden="true" className="bg-glow pointer-events-none absolute inset-0" />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary sm:inline-flex">
                  <FileText className="size-6" aria-hidden="true" />
                </span>
                <div className="max-w-xl">
                  <h2 id="resume-title" className="text-2xl font-semibold text-foreground sm:text-4xl">
                    Want to Know More About Me?
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    {resume.url
                      ? "Explore my resume to learn more about my technical skills, academic background, and projects."
                      : "My resume is available on request — send me a message and I'll share it with you."}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {resume.url ? (
                  <Button asChild variant="hero" size="lg">
                    <a href={resume.url} download={resume.fileName}>
                      <Download aria-hidden="true" />
                      Download My Resume
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="hero" size="lg">
                    <Link to="/" hash="contact">
                      <FileText aria-hidden="true" />
                      Request My Resume
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link to="/" hash="contact">
                    Let's Connect
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
