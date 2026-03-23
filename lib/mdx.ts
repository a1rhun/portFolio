import fs from "fs";
import matter from "gray-matter";
import path from "path";
import type { Project, ProjectFrontmatter } from "@/types/project";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function validateFrontmatter(data: Record<string, unknown>): ProjectFrontmatter | null {
  const { title, description, date } = data;
  if (typeof title !== "string" || !title) return null;
  if (typeof description !== "string") return null;
  if (typeof date !== "string") return null;

  return {
    title,
    slug: typeof data.slug === "string" ? data.slug : "",
    description,
    date,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
    github: typeof data.github === "string" ? data.github : undefined,
    demo: typeof data.demo === "string" ? data.demo : undefined,
    featured: typeof data.featured === "boolean" ? data.featured : undefined,
  };
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = validateFrontmatter(data);
  if (!frontmatter) return null;

  return { frontmatter, content, slug };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => p !== null)
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}
