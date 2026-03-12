"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const innerDot = innerDotRef.current;
    const innerRing = innerRingRef.current;
    if (!dot || !ring || !innerDot || !innerRing) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationId: number;
    let isVisible = false;
    let isPointer = false;

    const setVisible = (v: boolean) => {
      if (isVisible === v) return;
      isVisible = v;
      dot.style.opacity = v ? "1" : "0";
      ring.style.opacity = v ? "1" : "0";
    };

    const setPointer = (p: boolean) => {
      if (isPointer === p) return;
      isPointer = p;
      if (p) {
        innerDot.classList.remove("w-1.5", "h-1.5", "opacity-100");
        innerDot.classList.add("w-2", "h-2", "opacity-80");
        innerRing.classList.remove("w-8", "h-8");
        innerRing.classList.add("w-10", "h-10", "border-accent/80", "bg-accent/5");
      } else {
        innerDot.classList.remove("w-2", "h-2", "opacity-80");
        innerDot.classList.add("w-1.5", "h-1.5", "opacity-100");
        innerRing.classList.remove("w-10", "h-10", "border-accent/80", "bg-accent/5");
        innerRing.classList.add("w-8", "h-8");
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";
      setPointer(interactive);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Smooth ring follow with lerp
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.2s" }}
      >
        <div
          ref={innerDotRef}
          className="rounded-full bg-accent transition-all duration-200 w-1.5 h-1.5 opacity-100"
        />
      </div>

      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.2s" }}
      >
        <div
          ref={innerRingRef}
          className="rounded-full border border-accent/50 transition-all duration-200 w-8 h-8"
        />
      </div>
    </>
  );
}
