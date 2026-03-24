export type ProjectType = "mcp" | "skill" | "tool" | "framework" | "template";

export interface DirectoryProject {
  name: string;
  description: string;
  github_url: string;
  stars: number;
  type: ProjectType;
  domains: string[];
  domain_labels: Record<string, string>;
}
