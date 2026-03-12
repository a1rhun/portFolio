"use client";

import { useEffect, useRef } from "react";
import Header from "./Header";

export default function GlobalNav() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const sentinel = document.getElementById("nav-sentinel");
      const y = sentinel ? Math.max(16, sentinel.getBoundingClientRect().top) : 16;

      wrapper.style.transform = `translateX(-50%) translateY(${y}px)`;

      if (wrapper.style.visibility !== "visible") {
        wrapper.style.visibility = "visible";
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
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
