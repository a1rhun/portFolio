import { useEffect, useRef } from "react";

export function useKeyDown(key: string, callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) callbackRef.current();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key]);
}
