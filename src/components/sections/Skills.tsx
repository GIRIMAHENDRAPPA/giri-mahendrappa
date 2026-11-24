import { Brain, CodeXml, Database, PanelsTopLeft, Server, Users, Wrench } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { skillGroups, type SkillGroup, type SkillLevel } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const icons: Record<SkillGroup["icon"], typeof Brain> = {
  code: CodeXml,
  layout: PanelsTopLeft,
  server: Server,
  database: Database,
  brain: Brain,
  wrench: Wrench,
  users: Users,
};

const levelSteps: Record<SkillLevel, number> = { Learning: 1, Intermediate: 2, Advanced: 3 };

/** Only rendered when a real level is set in the content file. */
function LevelMeter({ level }: { level: SkillLevel }) {
  const steps = levelSteps[level];
  return (
    <span className="flex items-center gap-2" aria-label={`Proficiency: ${level}`}>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((s) => (
          <span key={s} className={cn("h-1.5 w-4 rounded-full", s <= steps ? "bg-primary" : "bg-border-strong")} />
        ))}
      </span>
      <span className="font-mono text-[0.7rem] text-muted-foreground">{level}</span>
    </span>
  );
}

export function Skills() {
  return (
    <Section id="skills" index="02" title="Technical Skills" subtitle="Technologies and tools I work with." tone="surface">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.id} delay={i * 0.05}>
              <article className="surface-card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0">
                      <span className="text-sm text-foreground">{skill.name}</span>
                      {skill.level ? <LevelMeter level={skill.level} /> : null}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
