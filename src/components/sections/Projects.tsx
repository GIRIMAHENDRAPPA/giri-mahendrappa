import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/content/portfolio";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-surface"
        aria-label={`View details for ${project.title}`}
      >
        {project.cover ? (
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            loading="lazy"
            decoding="async"
            width={1400}
            height={832}
            className="h-full w-full bg-white object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]">
            <ArchitectureDiagram compact />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[0.7rem] text-foreground backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow">{project.category}</p>
        <h3 className="mt-3 text-2xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{project.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.slice(0, 7).map((t) => (
            <li key={t} className="rounded-md border border-border px-2 py-1 font-mono text-[0.7rem] text-foreground">
              {t}
            </li>
          ))}
          {project.tech.length > 7 ? (
            <li className="rounded-md px-2 py-1 font-mono text-[0.7rem] text-muted-foreground">
              +{project.tech.length - 7}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <Button asChild variant="hero" size="sm">
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              View Details
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <Github aria-hidden="true" />
              Repository
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      title="Featured Projects"
      subtitle="Some of the projects I've worked on, exploring intelligent systems and practical software solutions."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
