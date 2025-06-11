import { useEffect, useRef, useCallback } from "react";

// 🌊 Lightweight Liquid Cursor Trail
const useCursorTrail = () => {
  const trailRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const isTouch = useRef(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    if (isTouch.current) return;

    const { clientX: x, clientY: y } = e;

    if (trailRef.current) {
      trailRef.current.style.left = `${x - 10}px`;
      trailRef.current.style.top = `${y - 10}px`;
    }

    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
    }
  }, []);

  useEffect(() => {
    // Detect touch devices
    const handleTouchStart = () => {
      isTouch.current = true;
    };
    const handleMouseMove = (e: MouseEvent) => {
      isTouch.current = false;
      updateCursor(e);
    };

    // Create cursor elements
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    document.body.appendChild(trail);
    trailRef.current = trail;

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    glowRef.current = glow;

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchstart", handleTouchStart);
      if (trailRef.current?.parentNode)
        trailRef.current.parentNode.removeChild(trailRef.current);
      if (glowRef.current?.parentNode)
        glowRef.current.parentNode.removeChild(glowRef.current);
    };
  }, [updateCursor]);
};

// 🎨 Dynamic Theme Adaptation
const useThemeAdaptation = () => {
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      const body = document.body;

      // Remove existing theme classes
      body.classList.remove(
        "theme-morning",
        "theme-day",
        "theme-evening",
        "theme-night"
      );

      // Apply theme based on time
      if (hour >= 5 && hour < 10) {
        body.classList.add("theme-morning");
      } else if (hour >= 10 && hour < 17) {
        body.classList.add("theme-day");
      } else if (hour >= 17 && hour < 21) {
        body.classList.add("theme-evening");
      } else {
        body.classList.add("theme-night");
      }
    };

    updateTheme();

    // Update every minute
    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, []);
};

// ⚡ Ripple Effect Hook
const useRippleEffect = () => {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
    `;

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }, []);

  return { createRipple };
};

// 🌟 Lightweight Particle System
const useParticleSystem = (
  elementRef: React.RefObject<HTMLElement>,
  particleCount = 5
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const particles: HTMLElement[] = [];

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      element.appendChild(particle);
      particles.push(particle);
    };

    // Create particles on hover
    const handleMouseEnter = () => {
      for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 100);
      }
    };

    const handleMouseLeave = () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particles.length = 0;
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [elementRef, particleCount]);
};

// 🎯 Main Liquid Effects Component
const LiquidEffects: React.FC = () => {
  useCursorTrail();
  useThemeAdaptation();

  return null; // This component only provides effects
};

export default LiquidEffects;
export { useRippleEffect, useParticleSystem };
