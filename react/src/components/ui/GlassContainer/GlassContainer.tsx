import type { ReactNode } from "react";
import { useAccessibility } from "../../../contexts";

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "button" | "section" | "header";
}

export const GlassContainer = ({
  children,
  className = "",
  onClick,
  as: Component = "div"
}: GlassContainerProps) => {
  const { highContrast } = useAccessibility();

  const baseClasses = `
    rounded-2xl border shadow-glass backdrop-blur-2xl
    backdrop-brightness-115 backdrop-saturate-200
    transition-all duration-500
  `;

  const contrastClasses = highContrast
    ? "border-white/40 bg-black/60"
    : "border-white/20 bg-black/40";

  const hoverClasses = onClick
    ? `cursor-pointer hover:border-white/30 hover:shadow-glass-hover ${
        highContrast ? "hover:bg-black/70" : "hover:bg-black/50"
      }`
    : "";

  return (
    <Component
      className={`${baseClasses} ${contrastClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
