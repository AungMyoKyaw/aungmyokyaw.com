import { useState, useEffect } from "react";
import type { ProfileHeaderProps } from "../../../types";
import { useAccessibility } from "../../../contexts";
import { getAvatarFallback } from "../../../utils";

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const { prefersReducedMotion, highContrast } = useAccessibility();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative overflow-hidden">
      {/* Liquid glass header background */}
      <div className="frosted-glass absolute inset-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-indigo-900/20 ${highContrast ? "from-purple-900/40 via-blue-900/30 to-indigo-900/40" : ""} `}
        />

        {/* Animated background orbs - respect motion preferences */}
        {!prefersReducedMotion && (
          <>
            <div className="absolute left-10 top-10 h-32 w-32 animate-liquid-float rounded-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-3xl" />
            <div
              className="absolute bottom-10 right-10 h-40 w-40 animate-liquid-float rounded-full bg-gradient-to-r from-pink-400/20 to-blue-500/20 blur-3xl"
              style={{ animationDelay: "2s" }}
            />
          </>
        )}
      </div>

      {/* Header content with enhanced semantics */}
      <div
        className={`relative z-10 p-8 text-center transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"} `}
      >
        {/* Professional Avatar with enhanced accessibility */}
        <div className="relative mx-auto mb-8 h-32 w-32 sm:h-40 sm:w-40">
          {/* Subtle glow ring */}
          <div
            className={`absolute inset-0 rounded-full blur-lg ${
              highContrast
                ? "bg-white/30"
                : "bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20"
            } `}
          />

          {/* Clean avatar container */}
          <div
            className={`relative overflow-hidden rounded-full border-4 backdrop-blur-md ${
              highContrast
                ? "border-white/60 bg-white/20"
                : "border-white/30 bg-white/10"
            } `}
          >
            <img
              src={profile.image}
              alt={`${profile.name} profile`}
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                e.currentTarget.src = getAvatarFallback(profile.name);
              }}
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
          </div>
        </div>

        {/* Enhanced name with better hierarchy */}
        <h1
          className={`text-hero mb-4 font-display font-black tracking-tight ${highContrast ? "text-white" : "text-glass-primary"} `}
        >
          <span className="relative">
            {profile.name}
            {/* Subtle emphasis line */}
            <div
              className={`absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full ${
                highContrast
                  ? "bg-white/80"
                  : "bg-gradient-to-r from-cyan-400/60 to-purple-500/60"
              } `}
            />
          </span>
        </h1>

        {/* Enhanced title with better container */}
        <div className="mb-8 inline-block">
          <div
            className={`rounded-2xl border px-6 py-3 shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 ${
              highContrast
                ? "border-white/40 bg-black/60"
                : "border-white/20 bg-black/40"
            } `}
          >
            <p
              className={`text-body-lg font-primary ${highContrast ? "text-white" : "text-glass-primary"} `}
            >
              {profile.title}
            </p>
          </div>
        </div>

        {/* Enhanced social links with better accessibility */}
        <nav aria-label="Social media links">
          <div className="flex justify-center space-x-6">
            {profile.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="group relative rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-xl shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 transition-all duration-500 micro-bounce gpu-accelerated ${
                    highContrast
                      ? "border-white/40 bg-black/60 text-white hover:border-white/60 hover:bg-black/70"
                      : "border-white/20 bg-black/40 text-white drop-shadow-text-high hover:border-white/40 hover:bg-black/50"
                  } group-hover:shadow-lg`}
                >
                  <i className={link.iconClass} />

                  {/* Enhanced glow effect */}
                  {!highContrast && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  )}
                </div>
              </a>
            ))}
          </div>
        </nav>

        {/* Enhanced floating particles with accessibility consideration */}
        {!prefersReducedMotion && !highContrast && (
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            {[...Array(15)].map((_, i) => (
              <div
                key={`header-particle-${i}-${Math.random()}`}
                className="absolute h-1 w-1 animate-liquid-float rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
