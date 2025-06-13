import { useEffect, useState, useCallback, useRef } from "react";
import type { RevealState } from '../types';

export const useScrollBasedReveal = (): RevealState => {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-reveal-index") || "0"
            );
            setRevealedItems((prev) => new Set(prev).add(index));
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const registerElement = useCallback(
    (element: HTMLElement | null, index: number) => {
      if (element && observerRef.current) {
        element.setAttribute("data-reveal-index", index.toString());
        observerRef.current.observe(element);
      }
    },
    []
  );

  return { revealedItems, registerElement };
};
