"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// 전역에서 lenis 인스턴스에 접근하기 위한 타입 확장
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 터치 디바이스(모바일/태블릿)에서는 네이티브 momentum 스크롤이 더 부드럽고 GPU 친화적임.
    // Lenis가 끼면 iOS에서 input lag, Android에서 scroll jank가 발생.
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
