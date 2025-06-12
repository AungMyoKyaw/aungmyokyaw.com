import { useEffect, useRef } from "react";

// Intersection Observer Hook for Scroll Animations
export const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("animate-fade-in-up");
          element.style.animationDelay = "0s";
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
        ...options
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return ref;
};

// Enhanced Stagger Animation Hook
export const useStaggerAnimation = (
  delay: number = 150,
  options?: IntersectionObserverInit
) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * delay}ms`;
            child.classList.add("animate-fade-in-up");
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [delay, options]);

  return containerRef;
};

// Parallax Effect Hook
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      element.style.transform = `translateY(${parallax}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
};
