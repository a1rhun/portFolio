"use client";

import { useEffect, useState } from "react";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/lib/hooks/useIsTouchDevice";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function ParticleBackground() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  // 모바일에서는 파티클 12개로 축소, 데스크톱은 40개. 모션 감소 시 비활성.
  const particleCount = reducedMotion ? 0 : isTouch ? 12 : 40;

  useEffect(() => {
    if (particleCount === 0) {
      setParticles([]);
      return;
    }
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.8,
        delay: Math.random() * 12,
        duration: Math.random() * 8 + 8,
      }))
    );
  }, [particleCount]);

  // 모바일: blur 반경 대폭 축소(GPU 부담↓), drift 애니메이션 제거, 그리드 메쉬 생략
  const primaryBlobBlur = isTouch ? 60 : 100;
  const secondaryBlobBlur = isTouch ? 50 : 80;
  const tertiaryBlobBlur = isTouch ? 50 : 90;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient mesh blobs */}
      <div
        className="particle-blob absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10"
        style={{
          width: isTouch ? 420 : 700,
          height: isTouch ? 420 : 700,
          filter: `blur(${primaryBlobBlur}px)`,
        }}
      />
      {!isTouch && (
        <>
          <div
            className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-accent2/8"
            style={{
              filter: `blur(${secondaryBlobBlur}px)`,
              animation: "blobDrift 14s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/6"
            style={{
              filter: `blur(${tertiaryBlobBlur}px)`,
              animation: "blobDrift 11s ease-in-out infinite alternate-reverse",
            }}
          />
        </>
      )}

      {/* Subtle grid mesh — 데스크톱 전용 (모바일에서 페인트 비용 큼) */}
      {!isTouch && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      )}

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent/50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `particleFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
