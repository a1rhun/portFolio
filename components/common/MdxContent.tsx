import { MDXRemote } from "next-mdx-remote/rsc";

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <MDXRemote source={source} />
    </article>
  );
}
