import { useEffect, useRef, useState } from "react";
import type { MOOCCardProps } from "../../../types";
import { useRippleEffect } from "../../3d/LiquidBackgroundEffects";
import { useAccessibility } from "../../../contexts";
import { useScrollBasedReveal } from "../../../hooks";
import { truncateCourseTitle } from "../../../utils";
import { StatusBadge, TypeBadge } from "../../ui";

export const CourseCard = ({ mooc, index }: MOOCCardProps) => {
  const { createRipple } = useRippleEffect();
  const { prefersReducedMotion, highContrast } = useAccessibility();
  const { revealedItems, registerElement } = useScrollBasedReveal();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Register for progressive reveal
  useEffect(() => {
    registerElement(cardRef.current, index);
  }, [registerElement, index]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!prefersReducedMotion) {
      createRipple(e);
    }
    // Haptic feedback for supported devices
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    // Small delay for ripple effect if animations are enabled
    const delay = prefersReducedMotion ? 0 : 100;
    setTimeout(() => {
      window.open(mooc.certificateLink, "_blank");
    }, delay);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const isCompleted = mooc.status === "Completed";
  const isRevealed = revealedItems.has(index);

  // Enhanced card classes with accessibility considerations
  const cardClasses = `
    group relative w-full cursor-pointer border-none bg-transparent p-0
    transition-all duration-500 ease-out card-micro-feedback magnetic-button
    ${isRevealed ? "progressive-reveal in-view" : "progressive-reveal"}
    ${prefersReducedMotion ? "motion-safe:transition-none" : ""}
    ${highContrast ? "high-contrast-mode" : ""}
  `.trim();

  return (
    <button
      ref={cardRef}
      type="button"
      className={cardClasses}
      style={{
        animationDelay: prefersReducedMotion ? "0s" : `${index * 0.15}s`
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-label={`View certificate for ${mooc.courseTitle}`}
      aria-describedby={`card-description-${index}`}
    >
      {/* Enhanced card layout */}
      <div
        className={`h-full min-h-[180px] rounded-2xl border border-white/20 bg-black/40 p-6 shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 transition-all duration-500 ${isHovered ? "scale-[1.02] border-white/30 shadow-glass-hover" : ""} ${highContrast ? "border-white/60 bg-black/70" : ""} `}
      >
        {/* Header row with title and status */}
        <div className="mb-4 flex items-start justify-between">
          {/* Course title */}
          <h3
            className={`flex-1 pr-4 text-left text-lg font-bold leading-tight tracking-tight drop-shadow-card-title ${highContrast ? "text-white" : "text-white"} `}
          >
            {truncateCourseTitle(mooc.courseTitle)}
          </h3>

          {/* Status badge */}
          <StatusBadge status={mooc.status} />
        </div>

        {/* Course type and details */}
        <TypeBadge type={mooc.type} courseCount={mooc.courses?.length} />

        {/* Bottom action area */}
        <div className="absolute bottom-4 left-6 right-6">
          <div
            className={`flex items-center justify-between font-semibold transition-all duration-300 ${isHovered ? "text-white" : "text-white/70"} ${highContrast ? "text-white" : ""} `}
          >
            <div className="flex items-center">
              <div
                className={`mr-2 h-2.5 w-2.5 rounded-full shadow-sm ${
                  isCompleted
                    ? "bg-green-400 shadow-green-400/50"
                    : "bg-orange-400 shadow-orange-400/50"
                } `}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold">View Certificate</span>
            </div>
            <div
              className={`transform transition-transform duration-300 ${isHovered ? "translate-x-1" : ""} `}
            >
              <svg
                className={`h-4 w-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"} `}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Enhanced floating particles */}
        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
            {[...Array(4)].map((_, i) => (
              <div
                key={`particle-${mooc.courseTitle}-${i}`}
                className={`absolute h-1 w-1 animate-liquid-float rounded-full bg-white/20 opacity-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : ""} `}
                style={{
                  left: `${25 + i * 20}%`,
                  top: `${35 + i * 15}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${4 + i * 0.6}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Hidden description for screen readers */}
        <div id={`card-description-${index}`} className="sr-only">
          {`${mooc.type} titled ${mooc.courseTitle}, status: ${mooc.status}.
          ${mooc.courses ? `Contains ${mooc.courses.length} courses.` : ""}
          Click to view certificate.`}
        </div>
      </div>
    </button>
  );
};
