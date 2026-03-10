"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { id: "skills", label: "기술" },
  { id: "projects", label: "프로젝트" },
  { id: "activities", label: "경력" },
  { id: "contact", label: "연락" },
];

const logoDots = ["#007AFF", "#00C676", "#E2FF00"];

// Liquid glass 스타일
const glassStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(67,97,238,0.38) 0%, rgba(99,102,241,0.28) 100%)",
  backdropFilter: "blur(32px) saturate(200%) brightness(1.08)",
  WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.08)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow:
    "0 8px 40px rgba(67,97,238,0.28), inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -1px 0 rgba(67,97,238,0.18)",
};

const mobileGlassStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, rgba(67,97,238,0.5) 0%, rgba(99,102,241,0.4) 100%)",
  backdropFilter: "blur(32px) saturate(200%) brightness(1.08)",
  WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 12px 40px rgba(67,97,238,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
};

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 스크롤 위치에 따라 active section 감지
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (!el) continue;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4, rootMargin: "-10% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* 메인 pill */}
      <div className="flex items-center gap-2 h-12 pl-6 pr-2 rounded-full" style={glassStyle}>
        {/* 로고: 3개의 컬러 점 */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 pr-2 shrink-0 group"
          aria-label="맨 위로"
        >
          {logoDots.map((color) => (
            <span
              key={color}
              className="w-4 h-4 rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </button>

        {/* 데스크탑 링크 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="relative px-4 py-2 rounded-full text-sm font-semibold tracking-[-0.025em] transition-colors duration-200 select-none"
              style={{
                color: activeSection === id ? "#111111" : "rgba(255,255,255,0.78)",
              }}
            >
              {/* Framer Motion active pill */}
              {activeSection === id && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,244,255,0.92) 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 2px 8px rgba(67,97,238,0.2)",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {label}
            </button>
          ))}
        </nav>

        {/* 다크모드 토글 */}
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity ml-1"
            style={{ color: "rgba(255,255,255,0.85)" }}
            aria-label="테마 전환"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {/* 모바일 햄버거 */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity ml-1"
          style={{ color: "rgba(255,255,255,0.85)" }}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="md:hidden absolute top-14 left-4 right-4 rounded-2xl p-2"
            style={mobileGlassStyle}
          >
            {navLinks.map(({ id, label }, i) => (
              <motion.button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-[-0.025em] transition-all duration-200 ${
                  activeSection === id
                    ? "bg-white/90 text-[#111111]"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
