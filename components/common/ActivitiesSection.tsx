"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ActivityCategory, ActivityType } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import AnimatedSection from "./AnimatedSection";
import { activities, activityCategories } from "./data/activitiesData";

// ── Styling ────────────────────────────────────────────────────────────────
const dotBg: Record<ActivityType, string> = {
  경력: "bg-accent",
  활동: "bg-accent2",
  수상: "bg-chart-4",
};

const tabStyle: Record<string, { active: string; inactive: string }> = {
  전체: {
    active: "bg-foreground text-background",
    inactive:
      "text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
  },
  경력: {
    active: "bg-accent text-white shadow-accent/25",
    inactive: "text-accent/60 border-accent/25 hover:border-accent/50 hover:text-accent",
  },
  활동: {
    active: "bg-accent2 text-white shadow-accent2/25",
    inactive: "text-accent2/60 border-accent2/25 hover:border-accent2/50 hover:text-accent2",
  },
  수상: {
    active: "bg-chart-4 text-black shadow-chart-4/25",
    inactive: "text-chart-4/60 border-chart-4/25 hover:border-chart-4/50 hover:text-chart-4",
  },
};

// ── Layout helpers ─────────────────────────────────────────────────────────
//
//  Single vertical line at x=12px.
//  Cards start at ml-10 (40px), leaving 28px for the dot area.
//
//  Desktop alternating:
//    full  → ml-10, flex-1 (경력: prominent full-width card)
//    left  → ml-10, w-[calc(50%-2.5rem)]  (ends at exactly the center)
//    right → ml-10 mobile / ml-[calc(50%+1rem)] desktop, w-[calc(50%-1rem)]

function cardClass(side: "full" | "left" | "right"): string {
  if (side === "full") return "ml-10";
  if (side === "left") return "ml-10 md:w-[calc(50%-2.5rem)]";
  return "ml-10 md:ml-[calc(50%+1rem)] md:flex-none md:w-[calc(50%-1rem)]";
}

// ── Component ─────────────────────────────────────────────────────────────
export default function ActivitiesSection() {
  const [active, setActive] = useState<ActivityCategory>("전체");

  const handleTabChange = (tab: ActivityCategory) => {
    if (tab !== active) setActive(tab);
  };

  // Precompute side & isActive for every item (all items always rendered)
  let nonLgCount = 0;
  const computedItems = activities.map((item) => ({
    ...item,
    side:
      item.type === "경력"
        ? ("full" as const)
        : nonLgCount++ % 2 === 0
          ? ("left" as const)
          : ("right" as const),
    isActive: active === "전체" || item.type === active,
  }));

  return (
    <section id="activities" className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto w-full">
        {/* ── Header ─────────────────────────────────────────── */}
        <AnimatedSection className="mb-12">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">Experience</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">성장 과정</h2>
          <p className="text-muted-foreground mt-3">성장 과정과 주요 활동들입니다</p>
        </AnimatedSection>

        {/* ── Filter Tabs ────────────────────────────────────── */}
        <AnimatedSection delay={0.1} className="flex gap-2 mb-12 flex-wrap">
          {activityCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleTabChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 border ${
                active === cat
                  ? `${tabStyle[cat].active} shadow-lg border-transparent`
                  : tabStyle[cat].inactive
              }`}
            >
              {cat}
              {cat !== "전체" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {activities.filter((a) => a.type === cat).length}
                </span>
              )}
            </button>
          ))}
        </AnimatedSection>

        {/* ── Timeline ───────────────────────────────────────── */}
        <AnimatedSection delay={0.2}>
          <div className="relative">
            {/* Vertical line — draws itself top→bottom on scroll entry */}
            <motion.div
              className="absolute left-3 top-0 bottom-0 w-px bg-border/40 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="space-y-6">
              {computedItems.map((item, i) => (
                // Outer: scroll entry animation (fires once)
                <motion.div
                  key={item.id}
                  className="relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Inner: filter dim/highlight (independent of scroll animation) */}
                  <motion.div
                    animate={{ opacity: item.isActive ? 1 : 0.15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Dot + ripple — "commit 찍히는" 느낌 */}
                    <div className="absolute left-[6px] top-6 w-3 h-3">
                      {/* Ripple ring: expands & fades once on entry */}
                      <motion.div
                        className={`absolute inset-0 rounded-full ${dotBg[item.type]}`}
                        initial={{ scale: 1, opacity: 0.7 }}
                        whileInView={{ scale: 3.5, opacity: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          delay: i * 0.1 + 0.35,
                        }}
                      />
                      {/* Actual dot */}
                      <div
                        className={`absolute inset-0 rounded-full border-2 border-background z-20 ${dotBg[item.type]}`}
                      />
                    </div>

                    {/* Card — alternating position */}
                    <div className={cardClass(item.side)}>
                      <ActivityCard item={item} />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
