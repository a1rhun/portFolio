"use client";

import { useEffect, useRef } from "react";
import Header from "./Header";

export default function GlobalNav() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const update = () => {
      const sentinel = document.getElementById("nav-sentinel");
      const y = sentinel ? Math.max(16, sentinel.getBoundingClientRect().top) : 16;
      wrapper.style.transform = `translateX(-50%) translateY(${y}px)`;
      if (wrapper.style.visibility !== "visible") {
        wrapper.style.visibility = "visible";
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
