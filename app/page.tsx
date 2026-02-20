"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Mail } from "lucide-react";
import Link from "next/link";

const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Figma"];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-accent2/8 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
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
            <Link
              href="/projects"
              className="px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
            >
              연락하기
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
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

      {/* Tech Stack Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
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

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center glass rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">함께 일해요</h2>
          <p className="text-muted-foreground mb-8">새로운 프로젝트나 기회에 대해 이야기 나눠요.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={18} />
            연락하기
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
