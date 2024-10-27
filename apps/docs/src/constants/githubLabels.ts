export interface GithubLabel {
  name: string;
  color: string;
}

export const githubLabels: readonly GithubLabel[] = [
  {
    name: "bug",
    color: "#fc2929",
  },
  {
    name: "enhancement",
    color: "#84b6eb",
  },
  {
    name: "duplicate",
    color: "#cccccc",
  },
  {
    name: "help wanted",
    color: "#159818",
  },
  {
    name: "invalid",
    color: "#e6e6e6",
  },
  {
    name: "question",
    color: "#cc317c",
  },
  {
    name: "wontfix",
    color: "#ffffff",
  },
];
