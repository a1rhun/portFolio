export type ProjectCategory = "전체" | "개인" | "팀" | "수상작";
export type ProjectType = Exclude<ProjectCategory, "전체">;

export interface ProjectCardData {
  title: string;
  description: string;
  detail?: string;
  tags: string[];
  type: ProjectType;
  role?: string;
  team?: string;
  period?: string;
  points?: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}
