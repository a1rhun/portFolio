"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import type { ProjectCategory } from "./data/projectsData";
import { categories, projects } from "./data/projectsData";
import ProjectCard from "./ProjectCard";

const slideVariants = {
  enter: (dir: number) => ({
    x: dir * 60,
    opacity: 0,
    filter: "blur(3px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir * -60,
    opacity: 0,
    filter: "blur(3px)",
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  }),
};

// 카드 typeBadge와 동일한 색상 체계
const categoryStyle: Record<string, { active: string; inactive: string }> = {
  전체: {
    active: "bg-accent text-white shadow-accent/25",
    inactive: "text-muted-foreground border-border hover:border-accent/40 hover:text-accent",
  },
  개인: {
    active: "bg-accent text-white shadow-accent/25",
    inactive: "text-accent/60 border-accent/25 hover:border-accent/50 hover:text-accent",
  },
  팀: {
    active: "bg-accent2 text-white shadow-accent2/25",
    inactive: "text-accent2/60 border-accent2/25 hover:border-accent2/50 hover:text-accent2",
  },
  수상작: {
    active: "bg-chart-4 text-black shadow-chart-4/25",
    inactive: "text-chart-4/60 border-chart-4/25 hover:border-chart-4/50 hover:text-chart-4",
  },
};

export default function ProjectsSection() {
  const [active, setActive] = useState<ProjectCategory>("전체");
  const [direction, setDirection] = useState(0);

  const handleTabChange = (tab: ProjectCategory) => {
    if (tab === active) return;
    const cur = categories.indexOf(active);
    const next = categories.indexOf(tab);
    setDirection(next > cur ? 1 : -1);
    setActive(tab);
  };

  const filtered = active === "전체" ? projects : projects.filter((p) => p.type === active);

  return (
    <section id="projects" className="py-24 px-4 min-h-screen flex items-center relative z-10">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">프로젝트</h2>
          <p className="text-muted-foreground mt-3">직접 만들고 기여한 것들</p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1} className="flex gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleTabChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 border ${
                active === cat
                  ? `${categoryStyle[cat].active} shadow-lg border-transparent`
                  : categoryStyle[cat].inactive
              }`}
            >
              {cat}
              {cat !== "전체" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {projects.filter((p) => p.type === cat).length}
                </span>
              )}
            </button>
          ))}
        </AnimatedSection>

        {/* Cards grid with slide transition */}
        <div>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} data={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
