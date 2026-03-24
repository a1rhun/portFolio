"use client";

import { motion } from "framer-motion";
import { infoItems, whatIDo } from "@/components/common/data/aboutData";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ── Header ───────────────────────── */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">About Me</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">저는 이런 사람입니다</h1>
        </motion.div>

        {/* ── Profile + Bio ────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 mb-20 items-start"
        >
          {/* Profile image */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative w-[200px] h-[240px] md:w-[240px] md:h-[300px] rounded-2xl overflow-hidden">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-accent via-accent2/50 to-transparent z-10 pointer-events-none" />
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center text-muted-foreground/30 text-sm font-mono">
                Photo
              </div>
            </div>
          </div>

          {/* Bio + Info grid */}
          <div className="flex flex-col gap-6">
            <p className="text-foreground/80 text-base leading-relaxed">
              안녕하세요, 프론트엔드 개발자 공기훈입니다. 사용자의 입장에서 생각하고, 더 나은 경험을
              만들기 위해 고민합니다. React와 Next.js를 중심으로 모던 웹 개발에 집중하고 있으며,
              깔끔한 코드와 접근성을 중시하는 개발을 지향합니다. 새로운 기술을 배우는 것을 즐기며,
              꾸준한 성장을 목표로 합니다.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoItems.map(({ label, value, icon: Icon, highlight }) => (
                <div key={label} className="glass rounded-xl px-4 py-3 flex flex-col gap-1">
                  <span className="text-xs font-mono text-muted-foreground tracking-wide uppercase flex items-center gap-1.5">
                    <Icon size={11} />
                    {label}
                  </span>
                  <span
                    className={`text-sm font-semibold flex items-center gap-1.5 ${
                      highlight ? "text-green-400" : "text-foreground"
                    }`}
                  >
                    {highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    )}
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── What I Do ────────────────────── */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10"
          >
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">
              What I Do
            </p>
            <h2 className="text-3xl font-bold">주요 역량</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whatIDo.map(({ icon: Icon, title, description, tags }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-accent/30 transition-colors duration-300 group"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon size={20} />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
