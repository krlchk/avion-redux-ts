import { useCallback, useRef } from "react";

export function useSmoothScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const scrollIntoView = useCallback(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return [ref, scrollIntoView] as const;
}
