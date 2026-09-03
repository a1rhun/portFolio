"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { fadeUp } from "@/lib/animation";
import type { WhatIDoItem } from "@/types/whatIDo";

export default function WhatIDoCard({
  title,
  description,
  tags,
  index,
}: WhatIDoItem & { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      variants={fadeUp}
      className="glass rounded-2xl overflow-hidden flex flex-col hover:border-accent/30 transition-colors duration-300 group"
    >
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md font-mono text-xs bg-accent/8 text-accent/80 border border-accent/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 text-xs font-mono text-accent/70 hover:text-accent transition-colors w-fit mt-auto"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          {open ? "접기" : "기술 스택 보기"}
        </button>
      </div>
    </motion.div>
  );
}
