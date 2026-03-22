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
