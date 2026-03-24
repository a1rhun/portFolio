import { useMotionValue, useTransform } from "framer-motion";
import { useCallback } from "react";

export function useMouseGlow(initialX = 50, initialY = 50) {
  const glowX = useMotionValue(initialX);
  const glowY = useMotionValue(initialY);
  const glowLeft = useTransform(glowX, (v) => `${v}%`);
  const glowTop = useTransform(glowY, (v) => `${v}%`);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      glowX.set(((e.clientX - rect.left) / rect.width) * 100);
      glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [glowX, glowY]
  );

  const reset = useCallback(() => {
    glowX.set(initialX);
    glowY.set(initialY);
  }, [glowX, glowY, initialX, initialY]);

  return { glowLeft, glowTop, handleMouseMove, reset };
}
