"use client";

import { useState } from "react";
import { tagIconMap } from "./data/projectsData";

interface TagIconProps {
  name: string;
  size?: "sm" | "md";
}

export default function TagIcon({ name, size = "sm" }: TagIconProps) {
  const iconUrl = tagIconMap[name];
  const [errored, setErrored] = useState(false);

  const initials = name
    .split(/[\s.]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const boxSize = size === "md" ? "w-7 h-7" : "w-6 h-6";
  const imgSize = size === "md" ? 16 : 14;
  const textSize = size === "md" ? "h-7 px-2" : "h-6 px-1.5";

  return (
    <span className="relative group/tag">
      {iconUrl && !errored ? (
        <span
          className={`${boxSize} flex items-center justify-center rounded-md bg-white/5 border border-border/30 group-hover/tag:border-accent/40 transition-colors cursor-default`}
        >
          {/* biome-ignore lint/performance/noImgElement: decorative icon */}
          <img
            src={iconUrl}
            alt={name}
            width={imgSize}
            height={imgSize}
            className="opacity-60 group-hover/tag:opacity-100 transition-opacity"
            onError={() => setErrored(true)}
          />
        </span>
      ) : (
        <span
          className={`${textSize} flex items-center justify-center rounded-md font-mono text-[10px] text-muted-foreground bg-white/5 border border-border/30 group-hover/tag:border-accent/40 group-hover/tag:text-foreground transition-colors cursor-default`}
        >
          {initials}
        </span>
      )}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md text-xs font-mono whitespace-nowrap bg-popover border border-border text-foreground shadow-md opacity-0 scale-95 group-hover/tag:opacity-100 group-hover/tag:scale-100 transition-all duration-150 z-50">
        {name}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </span>
    </span>
  );
}
