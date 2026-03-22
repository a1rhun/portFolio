"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <MDXRemote {...source} />
    </article>
  );
}
