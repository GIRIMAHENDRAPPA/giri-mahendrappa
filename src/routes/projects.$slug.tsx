import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — Giri Mahendrappa" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title} — ${project.subtitle} | Giri Mahendrappa`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary.slice(0, 200) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <>
      <Navbar onHome={false} />
      <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-5 pt-24 sm:px-8">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">This project doesn't exist.</h1>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/" hash="projects">
            <ArrowLeft aria-hidden="true" /> Back to projects
          </Link>
        </Button>
      </main>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-border py-12">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </section>
    </Reveal>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <Navbar onHome={false} />
      <main className="pt-28 sm:pt-32">
        <article className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> All projects
          </Link>

          <header className="mt-8">
            <p className="eyebrow">{project.category}</p>
            <h1 className="mt-4 text-4xl font-semibold text-foreground sm:text-6xl">{project.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground sm:text-xl">{project.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" /> View on GitHub
                </a>
              </Button>
            </div>
          </header>

          <div className="surface-card mt-12 overflow-hidden">
            {project.cover ? (
              <img
                src={project.cover.src}
                alt={project.cover.alt}
                width={1400}
                height={832}
                className="w-full bg-white"
              />
            ) : (
              <div className="aspect-[16/10] sm:aspect-[16/8]">
                <ArchitectureDiagram />
              </div>
            )}
          </div>

          <div className="mt-6">
            <Block title="Overview">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{project.overview}</p>
            </Block>

            <Block title="Problem statement">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{project.problem}</p>
            </Block>

            <Block title="Objectives">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.objectives.map((o) => (
                  <li key={o} className="flex gap-3 rounded-xl border border-border p-4 text-sm text-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Methodology">
              <ol className="grid gap-4 sm:grid-cols-2">
                {project.methodology.map((m, i) => (
                  <li key={m.title} className="surface-card p-5">
                    <p className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-base font-semibold text-foreground">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>

            {project.results ? (
              <Block title="Results">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{project.results.heading}.</span> {project.results.note}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {project.results.metrics.map((m) => (
                    <div key={m.label} className="surface-card p-5">
                      <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">{m.label}</dt>
                      <dd className="mt-2 font-display text-3xl font-semibold text-foreground">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </Block>
            ) : null}

            <Block title="Technologies used">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs text-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Implementation details">
              <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {project.implementation.map((f) => (
                  <li key={f.path} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <code className="font-mono text-sm text-primary">{f.path}</code>
                    <span className="text-sm text-muted-foreground sm:text-right">{f.detail}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Screenshots">
              {project.screenshots.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.screenshots.map((s) => (
                    <figure key={s.src} className="surface-card overflow-hidden">
                      <a href={s.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full size: ${s.caption}`}>
                        <img src={s.src} alt={s.alt} loading="lazy" decoding="async" className="w-full bg-white" />
                      </a>
                      <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">{s.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-border-strong p-6 text-sm text-muted-foreground">
                  {project.screenshotsNote ?? "No screenshots available yet."}
                </p>
              )}
            </Block>

            <Reveal>
              <div className="surface-card my-12 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-xl font-semibold text-foreground">Explore the code</p>
                  <p className="mt-1 text-sm text-muted-foreground">The full source is available on GitHub.</p>
                </div>
                <Button asChild variant="hero">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" /> GitHub Repository
                  </a>
                </Button>
              </div>
            </Reveal>

            {others.length > 0 ? (
              <nav aria-label="Other projects" className="mb-24 border-t border-border pt-12">
                <p className="eyebrow">Next project</p>
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    to="/projects/$slug"
                    params={{ slug: o.slug }}
                    className="group mt-4 flex items-center justify-between gap-4"
                  >
                    <span className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                      {o.title}
                    </span>
                    <ArrowUpRight className="size-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
