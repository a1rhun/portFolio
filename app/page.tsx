"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { roles, whatIDo } from "@/components/common/data/homeData";
import ParticleBackground from "@/components/common/ParticleBackground";
import SkillsSection from "@/components/common/SkillsSection";
import TypewriterText from "@/components/common/TypewriterText";
import WhatIDoCard from "@/components/common/WhatIDoCard";
import { fadeUp } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  // 애니메이션 라이브러리 혼용 의도:
  // - GSAP + ScrollTrigger: Hero 패럴랙스처럼 스크롤 진행률에 따라 값을 실시간으로 scrub해야 할 때 사용.
  //   Framer Motion의 useScroll/useTransform으로도 가능하지만, GSAP scrub이 타임라인 제어에 더 직관적.
  // - Framer Motion: 섹션 등장(whileInView), 마운트 애니메이션 등 상태 기반 트랜지션에 사용.
  //   React 컴포넌트 트리와 자연스럽게 통합되고 variants 재사용이 용이함.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroContentRef.current || !heroSectionRef.current) return;

      gsap.to(heroContentRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <ParticleBackground />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section ref={heroSectionRef} id="hero" className="relative flex flex-col min-h-screen px-4">
        <div
          ref={heroContentRef}
          className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-3xl mx-auto w-full text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-accent text-sm mb-4 tracking-widest uppercase"
          >
            안녕하세요, 저는
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold mb-4 tracking-tight"
          >
            공기훈
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-semibold mb-6 min-h-[1.5em]"
          >
            <TypewriterText texts={roles} className="gradient-text" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            사용자 경험을 중심으로 생각하는 프론트엔드 개발자입니다.
            <br />
            깔끔한 코드와 아름다운 인터페이스를 만드는 것을 좋아합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
            >
              프로젝트 보기
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
            >
              연락하기
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <a
              href="https://github.com/a1rhun"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="mailto:hello@example.com"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </motion.div>

          <div id="nav-sentinel" aria-hidden="true" className="mt-8" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center gap-2 text-muted-foreground pb-10 relative z-10"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ─────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              사용자를 먼저 생각하는
              <br />
              <span className="gradient-text">프론트엔드 개발자</span>
            </h2>
          </motion.div>

          {/* Profile + Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 mb-20 items-start"
          >
            {/* Profile image */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-accent2/10 to-transparent blur-2xl pointer-events-none" />
                {/* Photo card */}
                <div className="relative w-[200px] h-[240px] md:w-[240px] md:h-[300px] rounded-2xl overflow-hidden ring-1 ring-accent/25 shadow-xl shadow-black/40">
                  <img
                    src="/profile.jpg"
                    alt="공기훈 프로필 사진"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-5">
              <div className="relative pl-5 border-l-2 border-accent/40">
                <p className="text-foreground/75 text-base leading-[1.9] tracking-wide">
                  안녕하세요,{" "}
                  <span className="text-accent font-semibold">프론트엔드 개발자 공기훈</span>
                  입니다. 사용자의 입장에서 생각하고, 더 나은 경험을 만들기 위해 고민합니다. React와
                  Next.js를 중심으로 모던 웹 개발에 집중하고 있으며, 깔끔한 코드와 접근성을 중시하는
                  개발을 지향합니다. 새로운 기술을 배우는 것을 즐기며, 꾸준한 성장을 목표로 합니다.
                </p>
              </div>

              {/* 구직 중 칩 */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/25">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  구직 중
                </span>
              </div>
            </div>
          </motion.div>

          {/* What I Do */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-10"
            >
              <h3 className="text-3xl font-bold">이렇게 일합니다</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {whatIDo.map((item, i) => (
                <WhatIDoCard key={item.title} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SkillsSection />

      {/* ── Projects ──────────────────────────────────────── */}
      <section id="projects" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <AnimatedSection className="text-center mb-12">
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">Work</p>
            <h2 className="text-3xl font-bold">프로젝트</h2>
          </AnimatedSection>
          {/* TODO: 이슈 #5에서 구현 */}
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">🚧 준비 중</div>
        </div>
      </section>

      {/* ── Activities ────────────────────────────────────── */}
      <section id="activities" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <AnimatedSection className="text-center mb-12">
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
              Experience
            </p>
            <h2 className="text-3xl font-bold">경력</h2>
          </AnimatedSection>
          {/* TODO: 이슈 #6에서 구현 */}
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">🚧 준비 중</div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section id="contact" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto w-full text-center glass rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">함께 일해요</h2>
          <p className="text-muted-foreground mb-8">새로운 프로젝트나 기회에 대해 이야기 나눠요.</p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={18} />
            연락하기
          </a>
        </AnimatedSection>
      </section>
    </div>
  );
}
