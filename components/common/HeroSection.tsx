"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { roles } from "@/components/common/data/homeData";
import GithubIcon from "@/components/common/GithubIcon";
import TypewriterText from "@/components/common/TypewriterText";

gsap.registerPlugin(ScrollTrigger);

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

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
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="p-2 text-muted-foreground hover:text-accent transition-colors"
            aria-label="이메일 보내기"
          >
            <Mail size={22} />
          </button>
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
  );
}
