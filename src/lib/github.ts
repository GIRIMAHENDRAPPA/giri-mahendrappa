import { queryOptions } from "@tanstack/react-query";

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
  total: { lastYear?: number };
  contributions: ContributionDay[];
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

const GH = "https://api.github.com";

export const githubUserQuery = (username: string) =>
  queryOptions({
    queryKey: ["github", "user", username],
    queryFn: () => getJson<GitHubUser>(`${GH}/users/${username}`),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

export const githubReposQuery = (username: string) =>
  queryOptions({
    queryKey: ["github", "repos", username],
    queryFn: async () => {
      const repos = await getJson<GitHubRepo[]>(`${GH}/users/${username}/repos?per_page=100&sort=pushed`);
      return repos.filter((r) => !r.fork);
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

export const githubContributionsQuery = (username: string) =>
  queryOptions({
    queryKey: ["github", "contributions", username],
    queryFn: () => getJson<Contributions>(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

/** Group days into Sunday-first weeks for a GitHub-style heatmap. */
export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  const first = days[0];
  if (first) {
    const pad = new Date(`${first.date}T00:00:00Z`).getUTCDay();
    for (let i = 0; i < pad; i++) week.push(null);
  }
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}
