import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, FolderGit, GitFork, Github, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { profile } from "@/content/portfolio";
import {
  githubContributionsQuery,
  githubReposQuery,
  githubUserQuery,
  toWeeks,
  type ContributionDay,
} from "@/lib/github";
import { cn } from "@/lib/utils";

const heat = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Heatmap({ days }: { days: ContributionDay[] }) {
  const weeks = toWeeks(days);
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-[3px]" role="img" aria-label="Contribution heatmap for the last year">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, di) => {
              const d = week[di];
              return (
                <span
                  key={di}
                  title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                  className={cn("size-[11px] rounded-[3px]", d ? heat[d.level] : "bg-transparent")}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Fallback({ what }: { what: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong p-6 text-sm text-muted-foreground">
      Couldn't load {what} from GitHub right now.{" "}
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        View it on GitHub
      </a>
      .
    </div>
  );
}

export function GitHubActivity() {
  const user = useQuery(githubUserQuery(profile.githubUsername));
  const repos = useQuery(githubReposQuery(profile.githubUsername));
  const contrib = useQuery(githubContributionsQuery(profile.githubUsername));

  return (
    <Section
      id="github"
      index="06"
      title="GitHub Activity"
      subtitle="Building, experimenting, and learning through code."
      tone="surface"
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Reveal>
          <aside className="surface-card h-full p-6 sm:p-8" aria-label="GitHub profile">
            {user.isPending ? (
              <div className="space-y-4">
                <Skeleton className="size-16 rounded-2xl" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : user.isError ? (
              <div className="flex items-center gap-3">
                <Github className="size-8 text-foreground" aria-hidden="true" />
                <p className="font-mono text-sm text-foreground">@{profile.githubUsername}</p>
              </div>
            ) : (
              <>
                <img
                  src={user.data.avatar_url}
                  alt={`GitHub avatar of ${user.data.login}`}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="size-16 rounded-2xl border border-border"
                />
                <p className="mt-4 font-display text-lg font-semibold text-foreground">{profile.name}</p>
                <p className="font-mono text-sm text-muted-foreground">@{user.data.login}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border p-3">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">Repositories</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-foreground">{user.data.public_repos}</dd>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">Past year</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-foreground">
                      {contrib.data?.total.lastYear ?? "—"}
                    </dd>
                  </div>
                </dl>
              </>
            )}
            <Button asChild variant="outline" className="mt-6 w-full">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github aria-hidden="true" />
                View GitHub Profile
              </a>
            </Button>
          </aside>
        </Reveal>

        <div className="flex min-w-0 flex-col gap-6">
          <Reveal>
            <div className="surface-card p-6 sm:p-8">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">Contributions</h3>
                {contrib.data ? (
                  <p className="font-mono text-xs text-muted-foreground">
                    {contrib.data.total.lastYear ?? 0} contributions in the last year
                  </p>
                ) : null}
              </div>
              {contrib.isPending ? (
                <Skeleton className="h-[101px] w-full" />
              ) : contrib.isError ? (
                <Fallback what="contribution activity" />
              ) : (
                <>
                  <Heatmap days={contrib.data.contributions} />
                  <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[0.7rem] text-muted-foreground">
                    Less
                    {heat.map((h) => (
                      <span key={h} className={cn("size-[11px] rounded-[3px]", h)} aria-hidden="true" />
                    ))}
                    More
                  </div>
                </>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h3 className="mb-4 text-base font-semibold text-foreground">Repositories</h3>
              {repos.isPending ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-2xl" />
                  ))}
                </div>
              ) : repos.isError ? (
                <Fallback what="repositories" />
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {repos.data.slice(0, 6).map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="surface-card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex min-w-0 items-center gap-2 font-mono text-sm text-foreground">
                            <FolderGit className="size-4 shrink-0 text-primary" aria-hidden="true" />
                            <span className="truncate">{r.name}</span>
                          </span>
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                        </div>
                        {r.description ? (
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                        ) : null}
                        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 font-mono text-[0.7rem] text-muted-foreground">
                          {r.language ? (
                            <span className="flex items-center gap-1.5">
                              <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                              {r.language}
                            </span>
                          ) : null}
                          <span className="flex items-center gap-1" aria-label={`${r.stargazers_count} stars`}>
                            <Star className="size-3" aria-hidden="true" /> {r.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1" aria-label={`${r.forks_count} forks`}>
                            <GitFork className="size-3" aria-hidden="true" /> {r.forks_count}
                          </span>
                          <span>Updated {formatDate(r.pushed_at)}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
