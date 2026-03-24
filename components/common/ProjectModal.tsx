"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Link2, X } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { useKeyDown } from "@/hooks/useKeyDown";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { ProjectCardData, ProjectType } from "@/types/project";
import GithubIcon from "./GithubIcon";
import TagIcon from "./TagIcon";

const typeBadge: Record<ProjectType, string> = {
  개인: "bg-accent/10 text-accent border-accent/25",
  팀: "bg-accent2/10 text-accent2 border-accent2/25",
  수상작: "bg-chart-4/10 text-chart-4 border-chart-4/25",
};

const typeAccent: Record<ProjectType, string> = {
  개인: "from-sky-500/30 to-transparent",
  팀: "from-violet-500/30 to-transparent",
  수상작: "from-amber-500/30 to-transparent",
};

interface ProjectModalProps {
  data: ProjectCardData;
  onClose: () => void;
}

export default function ProjectModal({ data, onClose }: ProjectModalProps) {
  const { copied, copy } = useClipboard();

  useScrollLock();
  useKeyDown("Escape", onClose);

  const handleShare = () => {
    copy(data.demo ?? data.github ?? window.location.href);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg glass rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Color accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${typeAccent[data.type]} shrink-0`} />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border z-10"
          >
            <X size={14} />
          </button>

          {/* Scrollable content */}
          <div className="p-6 flex flex-col gap-5 overflow-y-auto">
            {/* Badges + period */}
            <div className="flex items-center gap-2 flex-wrap pr-8">
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-mono border ${typeBadge[data.type]}`}
              >
                {data.type}
              </span>
              {data.featured && (
                <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-accent/10 text-accent border border-accent/20">
                  ★ Featured
                </span>
              )}
              {data.period && (
                <span className="ml-auto text-xs text-muted-foreground font-mono shrink-0">
                  {data.period}
                </span>
              )}
            </div>

            {/* Title + meta */}
            <div>
              <h3 className="text-xl font-bold leading-snug">{data.title}</h3>
              {(data.role || data.team) && (
                <p className="text-xs text-muted-foreground mt-1.5 font-mono">
                  {[data.role, data.team && `팀 ${data.team}명`].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>

            {/* Detail */}
            {data.detail && (
              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                {data.detail}
              </p>
            )}

            {/* Key points */}
            {data.points && data.points.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Key Points
                </p>
                <ul className="flex flex-col gap-2.5">
                  {data.points.map((point, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: points는 순서 고정 목록
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5 shrink-0 font-bold">›</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            <div className="flex flex-col gap-2 border-t border-border/40 pt-4">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <TagIcon key={tag} name={tag} size="md" />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 border-t border-border/20 pt-4">
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
              )}
              {data.demo && (
                <a
                  href={data.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border"
                >
                  <ExternalLink size={15} />
                  데모
                </a>
              )}
              <button
                type="button"
                onClick={handleShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all border ml-auto ${
                  copied
                    ? "text-green-400 border-green-500/30 bg-green-500/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-border/40 hover:border-border"
                }`}
              >
                {copied ? <Check size={15} /> : <Link2 size={15} />}
                {copied ? "복사됨!" : "공유"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
