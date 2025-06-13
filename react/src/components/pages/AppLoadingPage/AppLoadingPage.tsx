import type { LoadingState } from "../../../types";
import { useAccessibility } from "../../../contexts";
import { Background3DScene } from "../../3d";

interface AppLoadingPageProps {
  loading: LoadingState;
}

export const AppLoadingPage = ({ loading }: AppLoadingPageProps) => {
  const { prefersReducedMotion, highContrast } = useAccessibility();

  return (
    <div
      className={`enhanced-loading-wrapper relative flex min-h-screen items-center justify-center overflow-hidden ${
        highContrast ? "bg-black" : ""
      }`}
    >
      {/* 3D background scene - conditionally rendered */}
      {!prefersReducedMotion && !highContrast && <Background3DScene />}

      {/* Enhanced liquid glass loading container */}
      <div className="relative z-10 text-center">
        <div
          className={`loading-glass-enhanced mx-auto max-w-xl p-20 ${
            highContrast ? "border-2 border-white/60 bg-black/80" : ""
          }`}
        >
          {/* Enhanced animated loading icon */}
          <div className="relative mb-16">
            {/* Enhanced pulse rings - respect motion preferences */}
            <div className="liquid-icon-container">
              {!prefersReducedMotion ? (
                <>
                  <div className="pulse-ring-enhanced" />
                  <div className="pulse-ring-enhanced" />
                  <div className="pulse-ring-enhanced" />
                </>
              ) : (
                <div className="static-ring" />
              )}

              {/* Enhanced rocket icon */}
              <div
                className={`rocket-icon-enhanced ${
                  prefersReducedMotion ? "animate-none" : ""
                }`}
              >
                🚀
              </div>

              {/* Enhanced orbital rings - conditional */}
              {!prefersReducedMotion && (
                <>
                  <div className="orbital-rings-enhanced" />
                  <div className="orbital-rings-enhanced" />
                </>
              )}
            </div>
          </div>

          {/* Enhanced title with better accessibility */}
          <h2
            className={`mb-6 text-4xl font-bold ${
              highContrast ? "text-white" : ""
            }`}
          >
            <span
              className={`${
                highContrast ? "text-white" : "liquid-gradient-text"
              } ${prefersReducedMotion ? "animate-none" : "animate-text-glow"}`}
            >
              Loading Portfolio...
            </span>
          </h2>

          {/* Enhanced progress indicator */}
          <div className="mb-6">
            <div
              className={`progress-indicator mx-auto w-80 ${
                highContrast ? "bg-white/30" : ""
              }`}
            >
              <div
                className={`progress-bar transition-all duration-500 ease-out ${
                  highContrast ? "bg-white" : ""
                }`}
                style={{ width: `${loading.progress}%` }}
              />
            </div>
            <div
              className={`progress-text mt-2 ${
                highContrast ? "text-white/90" : ""
              }`}
            >
              {loading.stage}
            </div>
          </div>

          {/* Enhanced loading dots - conditional animation */}
          {!prefersReducedMotion ? (
            <div className="enhanced-dots-container">
              <div className="enhanced-loading-dot" />
              <div className="enhanced-loading-dot" />
              <div className="enhanced-loading-dot" />
            </div>
          ) : (
            <div className="flex justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <div className="h-2 w-2 rounded-full bg-white/60" />
            </div>
          )}

          {/* Enhanced status text with accessibility improvements */}
          <div className="mt-8 space-y-4">
            <p
              className={`text-xl ${
                highContrast
                  ? "font-semibold text-white"
                  : "status-text-enhanced"
              }`}
            >
              Preparing your learning journey...
            </p>

            <div
              className={`flex items-center justify-center space-x-3 text-base ${
                highContrast ? "text-white/90" : "text-white/80"
              }`}
            >
              <span
                className={`${
                  prefersReducedMotion ? "" : "floating-emoji-enhanced"
                }`}
              >
                ✨
              </span>
              <span className="font-medium">
                Loading certificates and achievements
              </span>
              <span
                className={`${
                  prefersReducedMotion ? "" : "floating-emoji-enhanced"
                }`}
                style={{ animationDelay: prefersReducedMotion ? "0s" : "1s" }}
              >
                🎓
              </span>
            </div>
          </div>

          {/* Accessibility status for screen readers */}
          <output
            className="sr-only"
            aria-live="polite"
            aria-label={`Loading progress: ${loading.progress}% complete. ${loading.stage}`}
          >
            {loading.stage} {loading.progress}% complete
          </output>
        </div>
      </div>
    </div>
  );
};
