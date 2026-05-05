"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ActivityItem } from "@/types/activity";

interface Props {
  item: ActivityItem;
}

export default function ActivityCard({ item }: Props) {
  if (item.type === "경력") return <LargeCard item={item} />;
  if (item.type === "활동") return <MediumCard item={item} />;
  return <SmallCard item={item} />;
}

function LargeCard({ item }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex gap-4 items-start mb-4">
        {item.logo && (
          <div className="flex-none w-14 h-14 rounded-full overflow-hidden bg-white/10 border border-border">
            <Image
              src={item.logo}
              alt={item.organization}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.period}</p>
          {item.description && (
            <p className="text-sm text-muted-foreground italic mt-1">{item.description}</p>
          )}
        </div>
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md bg-accent/10 text-accent border border-accent/25 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.projects && item.projects.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <ChevronDown size={16} />
            </motion.span>
            {open ? "프로젝트 접기" : "프로젝트 펼치기"}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  {item.projects.map((proj) => (
                    <div key={proj.title} className="border-l-2 border-accent/30 pl-4">
                      <h4 className="font-semibold text-sm">{proj.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{proj.period}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function MediumCard({ item }: Props) {
  return (
    <div className="glass rounded-xl p-5">
      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-accent2/15 text-accent2 border border-accent2/25 mb-3">
        {item.period}
      </span>
      <h3 className="font-bold">{item.title}</h3>
      {item.role && <p className="text-sm text-muted-foreground mt-0.5">{item.role}</p>}
      <p className="text-sm text-muted-foreground">{item.organization}</p>
      {item.description && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
    </div>
  );
}

function SmallCard({ item }: Props) {
  return (
    <div className="glass rounded-xl p-4">
      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-chart-4/15 text-chart-4 border border-chart-4/25 mb-2">
        {item.period}
      </span>
      <h3 className="font-semibold text-sm">{item.title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{item.organization}</p>
    </div>
  );
}
