"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Link2 } from "lucide-react";
import { useState } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { fadeUp } from "@/lib/animation";
import type { ProjectCardData, ProjectType } from "@/types/project";
import GithubIcon from "./GithubIcon";
import ProjectModal from "./ProjectModal";
import TagIcon from "./TagIcon";

const typeBadge: Record<ProjectType, string> = {
  개인: "bg-accent/10 text-accent border-accent/25",
  팀: "bg-accent2/10 text-accent2 border-accent2/25",
  수상작: "bg-chart-4/10 text-chart-4 border-chart-4/25",
};

const typeAccentBar: Record<ProjectType, string> = {
  개인: "from-sky-500/20 to-transparent",
  팀: "from-violet-500/20 to-transparent",
  수상작: "from-amber-500/20 to-transparent",
};

const typeGlow: Record<
  ProjectType,
  { border: string; shadow: string; inner: string; shimmer: string }
> = {
  개인: {
    border: "rgba(14,165,233,0.42)",
    shadow: "rgba(14,165,233,0.14)",
    inner: "rgba(14,165,233,0.1)",
    shimmer: "rgba(14,165,233,0.9)",
  },
  팀: {
    border: "rgba(139,92,246,0.42)",
    shadow: "rgba(139,92,246,0.14)",
    inner: "rgba(139,92,246,0.1)",
    shimmer: "rgba(139,92,246,0.9)",
  },
  수상작: {
    border: "rgba(245,158,11,0.42)",
    shadow: "rgba(245,158,11,0.14)",
    inner: "rgba(245,158,11,0.08)",
    shimmer: "rgba(245,158,11,0.9)",
  },
};

export default function ProjectCard({ data, index }: { data: ProjectCardData; index: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { glowLeft, glowTop, handleMouseMove, reset } = useMouseGlow();
  const { copied, copy } = useClipboard();

  const { border, shadow, inner, shimmer } = typeGlow[data.type];

  const handleMouseLeave = () => {
    reset();
    setHovered(false);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    copy(data.demo ?? data.github ?? window.location.href);
  };

  return (
    <>
      <motion.div
        animate={hovered ? { scale: 1.03, zIndex: 10 } : { scale: 1, zIndex: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* 회전 보더 shimmer — overflow-hidden 바깥에 위치 */}
        <div
          className="absolute inset-[-1px] rounded-2xl pointer-events-none z-10 animate-border-rotate transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `conic-gradient(from var(--border-angle), transparent 60%, ${shimmer} 75%, rgba(255,255,255,0.5) 83%, ${shimmer} 90%, transparent 100%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1.5px",
          }}
        />

        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={index}
          variants={fadeUp}
          onClick={() => setModalOpen(true)}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={
            hovered
              ? { boxShadow: `0 0 0 1px ${border}, 0 6px 22px ${shadow}, 0 14px 34px ${shadow}` }
              : { boxShadow: "0 0 0 1px transparent, 0 0px 0px transparent" }
          }
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl overflow-hidden flex flex-col cursor-pointer relative group"
        >
          {/* Color accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${typeAccentBar[data.type]} shrink-0`} />

          {/* Mouse-following inner glow */}
          <motion.div
            className="pointer-events-none absolute w-28 h-28 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{
              left: glowLeft,
              top: glowTop,
              backgroundColor: inner,
              opacity: hovered ? 1 : 0,
            }}
          />

          <div className="relative p-6 flex flex-col gap-4 flex-1">
            {/* Badges + period */}
            <div className="flex items-center gap-2 flex-wrap">
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
              <h3 className="text-base font-semibold leading-snug transition-colors duration-200 group-hover:text-accent w-fit">
                {data.title}
                <span className="block h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-0.5" />
              </h3>
              {(data.role || data.team) && (
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {[data.role, data.team && `팀 ${data.team}명`].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>

            {/* Short description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>

            {/* Bottom row: tech stack icons + action buttons */}
            <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-border/20">
              <div className="flex flex-wrap gap-1.5">
                {data.tags.map((tag) => (
                  <TagIcon key={tag} name={tag} size="sm" />
                ))}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {data.github && (
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border"
                  >
                    <GithubIcon />
                  </a>
                )}
                {data.demo && (
                  <a
                    href={data.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="데모 보기"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all border border-border/40 hover:border-border"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleShare}
                  title={copied ? "복사됨!" : "링크 복사"}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all border ${
                    copied
                      ? "text-green-400 border-green-500/30 bg-green-500/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-border/40 hover:border-border"
                  }`}
                >
                  {copied ? <Check size={14} /> : <Link2 size={14} />}
                </button>
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>

      <AnimatePresence>
        {modalOpen && <ProjectModal data={data} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
