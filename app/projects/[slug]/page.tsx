import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import MdxContent from "@/components/common/MdxContent";
import { getAllProjects, getProjectBySlug, getProjectSlugs } from "@/lib/mdx";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const mdxSource = await serialize(project.content);

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full font-mono text-xs bg-accent/10 text-accent border border-accent/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.frontmatter.title}</h1>
          <p className="text-muted-foreground text-lg">{project.frontmatter.description}</p>

          <div className="flex gap-4 mt-6">
            {project.frontmatter.github && (
              <a
                href={project.frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors"
              >
                GitHub
              </a>
            )}
            {project.frontmatter.demo && (
              <a
                href={project.frontmatter.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* MDX Content */}
        <div className="glass rounded-2xl p-8">
          <MdxContent source={mdxSource} />
        </div>
      </div>
    </div>
  );
}
