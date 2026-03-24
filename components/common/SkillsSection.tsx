"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { TabKey } from "@/types/skill";
import AnimatedSection from "./AnimatedSection";
import { isGrouped, skillsByTab, tabs } from "./data/skillsData";
import SkillCard from "./SkillCard";

// 탭 전환 방향에 따라 슬라이드 방향 결정
const slideVariants = {
  enter: (dir: number) => ({
    x: dir * 80,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir * -80,
    opacity: 0,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
  }),
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("Frontend");
  const [direction, setDirection] = useState(0);
  const handleTabChange = (tab: TabKey) => {
    if (tab === activeTab) return;
    const currentIdx = tabs.indexOf(activeTab);
    const nextIdx = tabs.indexOf(tab);
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setActiveTab(tab);
  };

  const data = skillsByTab[activeTab];

  return (
    <section id="skills" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">Tech Stack</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Skills</h2>
          <p className="text-muted-foreground mt-3">주력부터 학습 중인 것까지</p>
        </AnimatedSection>

        {/* Tab nav */}
        <AnimatedSection delay={0.1} className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 ${
                activeTab === tab
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "text-muted-foreground border border-border hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </AnimatedSection>

        {/* Skill cards — 방향 감지 슬라이드 + 카드 스태거 재실행 */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {isGrouped(data) ? (
                <div className="flex flex-col gap-10">
                  {data.map((group) => (
                    <div key={group.category}>
                      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                        {group.category}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {group.skills.map((skill, i) => (
                          // activeTab을 key에 포함 → 탭 전환 시 remount로 스태거 애니메이션 재실행
                          <SkillCard key={`${activeTab}-${skill.name}`} {...skill} index={i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.map((skill, i) => (
                    <SkillCard key={`${activeTab}-${skill.name}`} {...skill} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
