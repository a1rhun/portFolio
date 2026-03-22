"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Layers, MapPin, Sparkles, User, Zap } from "lucide-react";
import Image from "next/image";

const infoItems = [
  { label: "이름", value: "공기훈", icon: User },
  { label: "위치", value: "서울", icon: MapPin },
  { label: "학력", value: "OO대학교 컴퓨터공학과", icon: GraduationCap },
  { label: "상태", value: "구직 중", icon: Briefcase, highlight: true },
];

const whatIDo = [
  {
    icon: Layers,
    title: "모던 프론트엔드",
    description:
      "React, Next.js App Router, TypeScript로 성능 최적화된 웹 애플리케이션을 구축합니다. SSR/SSG 전략과 Core Web Vitals를 고려한 개발을 지향합니다.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Sparkles,
    title: "UI/UX & 애니메이션",
    description:
      "Framer Motion, GSAP을 활용한 인터랙티브한 인터페이스를 만듭니다. 사용자 경험을 최우선으로 한 접근성 있는 디자인을 구현합니다.",
    tags: ["Framer Motion", "GSAP", "Tailwind CSS"],
  },
  {
    icon: Zap,
    title: "개발 경험 & 툴링",
    description:
      "Storybook, Biome, Lefthook으로 팀 개발 환경을 구축합니다. 컴포넌트 문서화와 코드 품질 자동화에 관심이 많습니다.",
    tags: ["Storybook", "Biome", "Git"],
  },
];

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
