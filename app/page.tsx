"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

function GithubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Figma"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Fixed background glow — outside hero so overflow-hidden isn't needed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-accent2/8 blur-[100px]" />
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section id="hero" className="relative flex flex-col min-h-screen px-4">
        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 max-w-3xl mx-auto w-full text-center">
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
            className="text-2xl sm:text-3xl font-semibold mb-6 gradient-text"
          >
            Frontend Developer
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
        </div>

        {/* sentinel — GlobalNav(layout.tsx)이 이 위치를 추적해 nav를 자연스럽게 배치 */}
        <div id="nav-sentinel" aria-hidden="true" className="h-16" />

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

      {/* ── Skills ────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
              Tech Stack
            </p>
            <h2 className="text-3xl font-bold">사용 기술</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="px-4 py-2 rounded-lg glass font-mono text-sm text-foreground hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────── */}
      <section id="projects" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">Work</p>
            <h2 className="text-3xl font-bold">프로젝트</h2>
          </motion.div>
          {/* TODO: 이슈 #5에서 구현 */}
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">🚧 준비 중</div>
        </div>
      </section>

      {/* ── Activities ────────────────────────────────────── */}
      <section id="activities" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
              Experience
            </p>
            <h2 className="text-3xl font-bold">경력</h2>
          </motion.div>
          {/* TODO: 이슈 #6에서 구현 */}
          <div className="glass rounded-2xl p-12 text-center text-muted-foreground">🚧 준비 중</div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section id="contact" className="py-24 px-4 min-h-screen flex items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto w-full text-center glass rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">함께 일해요</h2>
          <p className="text-muted-foreground mb-8">새로운 프로젝트나 기회에 대해 이야기 나눠요.</p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={18} />
            연락하기
          </a>
        </motion.div>
      </section>
    </div>
  );
}
