"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";

export type Level = "주력" | "실무" | "학습";

export type Skill = {
  name: string;
  description: string;
  level: Level;
  icon?: string; // cdn.simpleicons.org URL
};

const levelStyles: Record<Level, string> = {
  주력: "bg-accent/10 text-accent border border-accent/25",
  실무: "bg-accent2/10 text-accent2 border border-accent2/25",
  학습: "bg-muted text-muted-foreground border border-border",
};

function SkillIcon({ icon, name }: { icon?: string; name: string }) {
  const [errored, setErrored] = useState(false);

  if (icon && !errored) {
    return (
      // biome-ignore lint/performance/noImgElement: decorative icon, never LCP candidate
      <img
        src={icon}
        alt={`${name} logo`}
        width={20}
        height={20}
        className="w-5 h-5 object-contain"
        onError={() => setErrored(true)}
      />
    );
  }

  return <span className="text-accent font-bold text-sm font-mono">{name[0]}</span>;
}

export default function SkillCard({
  name,
  description,
  level,
  icon,
  index = 0,
}: Skill & { index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 400,
    damping: 40,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 400,
    damping: 40,
  });

  // Glow
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowLeft = useTransform(glowX, (v) => `${v}%`);
  const glowTop = useTransform(glowY, (v) => `${v}%`);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "800px" }}
    >
      <motion.button
        type="button"
        aria-expanded={open}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        onClick={() => setOpen(true)}
        className="relative glass rounded-xl p-5 flex flex-col gap-3 overflow-hidden cursor-pointer text-left w-full"
      >
        {/* Glow follow */}
        <motion.div
          className={`absolute w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{
            left: glowLeft,
            top: glowTop,
            transform: "translate(-50%, -50%)",
            backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
          }}
        />

        {/* 호버 시 하단 우측 아이콘 */}
        <AnimatePresence>
          {hovered && !open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-3 right-3 z-10 text-accent"
            >
              <Plus size={14} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 카드 앞면 */}
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <SkillIcon icon={icon} name={name} />
            </div>
            <span className="font-semibold text-sm">{name}</span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono shrink-0 ${levelStyles[level]}`}
          >
            {level}
          </span>
        </div>

        <p className="relative text-xs text-muted-foreground leading-relaxed">{description}</p>

        {/* 클릭 시 프로젝트 패널 */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-xl flex flex-col gap-3 p-5"
              style={{
                backgroundColor: "color-mix(in srgb, var(--card) 95%, transparent)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-accent uppercase tracking-widest">
                  관련 프로젝트
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-7 rounded-lg bg-accent/5 border border-accent/10 animate-pulse" />
                <div className="h-7 rounded-lg bg-accent/5 border border-accent/10 animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground mt-auto">프로젝트 섹션 업데이트 예정</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
