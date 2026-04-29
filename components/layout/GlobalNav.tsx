"use client";

import { useEffect, useRef } from "react";
import Header from "./Header";

export default function GlobalNav() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sentinel = document.getElementById("nav-sentinel");
    let ticking = false;

    const apply = () => {
      ticking = false;
      const y = sentinel ? Math.max(16, sentinel.getBoundingClientRect().top) : 16;
      wrapper.style.transform = `translateX(-50%) translateY(${y}px)`;
      if (wrapper.style.visibility !== "visible") {
        wrapper.style.visibility = "visible";
      }
    };

    // rAF 스로틀: scroll 이벤트마다 layout/paint 강제 발생을 막아 모바일 jank 감소
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed left-1/2 top-0 z-50"
      style={{ visibility: "hidden", willChange: "transform" }}
    >
      <Header />
    </div>
  );
}
