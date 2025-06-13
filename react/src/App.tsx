import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { Background3DScene, LiquidBackgroundEffects, useRippleEffect } from "./components/3d";

// Types
interface MOOCItem {
  courseTitle: string;
  type: "Course" | "Bundle";
  status: "In Progress" | "Completed";
  certificateLink: string;
  courses?: { title: string; certificateLink: string }[];
}

interface MOOCsData {
  total: number;
  items: MOOCItem[];
  moreLink?: string;
}

// Profile Types
interface ProfileData {
  name: string;
  image: string;
  title: string;
  socialLinks: SocialLink[];
}

interface SocialLink {
  href: string;
  iconClass: string;
  label: string;
  id: string;
}

// 🎯 Custom Hook for Progressive Reveal Animation
const useProgressiveReveal = () => {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-reveal-index") || "0"
            );
            setRevealedItems((prev) => new Set(prev).add(index));
          }
        });
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

// 🎯 Enhanced Accessibility Hook
const useAccessibility = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrastQuery = window.matchMedia("(prefers-contrast: high)");

    setPrefersReducedMotion(mediaQuery.matches);
    setHighContrast(contrastQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) =>
      setHighContrast(e.matches);

    mediaQuery.addEventListener("change", handleMotionChange);
    contrastQuery.addEventListener("change", handleContrastChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      contrastQuery.removeEventListener("change", handleContrastChange);
    };
  }, []);

  return { prefersReducedMotion, highContrast };
};

const profileData: ProfileData = {
  name: "Aung Myo Kyaw",
  image: "https://avatars.githubusercontent.com/u/9404824?v=4",
  title: "Tech Lead | Curious Programmer | Lifelong Learner",
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/aungmyokyaw/",
      iconClass: "fab fa-linkedin",
      label: "LinkedIn Profile",
      id: "linkedin"
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github",
      label: "GitHub Profile",
      id: "github"
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap",
      label: "Coursera Profile",
      id: "coursera"
    }
  ]
};

// MOOC Display Components
const MOOCCard = ({ mooc, index }: { mooc: MOOCItem; index: number }) => {
  const { createRipple } = useRippleEffect();
  const { prefersReducedMotion, highContrast } = useAccessibility();
  const { revealedItems, registerElement } = useProgressiveReveal();
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
      {/* Enhanced card layout with better semantics */}
      <div
        className={`h-full min-h-[180px] rounded-2xl border border-white/20 bg-black/40 p-6 shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 transition-all duration-500 ${isHovered ? "scale-[1.02] border-white/30 shadow-glass-hover" : ""} ${highContrast ? "border-white/60 bg-black/70" : ""} `}
      >
        {/* Header row with title and status */}
        <div className="mb-4 flex items-start justify-between">
          {/* Course title - enhanced readability */}
          <h3
            className={`flex-1 pr-4 text-left text-lg font-bold leading-tight tracking-tight drop-shadow-card-title ${highContrast ? "text-white" : "text-white"} `}
          >
            {mooc.courseTitle.replace(" ⏳", "").length > 65
              ? `${mooc.courseTitle.replace(" ⏳", "").substring(0, 65)}...`
              : mooc.courseTitle.replace(" ⏳", "")}
          </h3>

          {/* Enhanced status indicator with better semantics */}
          <div
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              isCompleted
                ? "border border-green-400/30 bg-green-500/20 text-green-300"
                : "border border-orange-400/30 bg-orange-500/20 text-orange-300"
            } ${highContrast ? "border-2" : ""} `}
            role="status"
            aria-label={`Course status: ${isCompleted ? "Completed" : "In Progress"}`}
          >
            {isCompleted ? "✓ Done" : "⏳ Learning"}
          </div>
        </div>

        {/* Course type and details */}
        <div className="mb-6 flex flex-wrap gap-2">
          <div
            className={`rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm ${
              mooc.type === "Bundle"
                ? "border-purple-400/30 bg-purple-500/20 text-purple-200"
                : "border-blue-400/30 bg-blue-500/20 text-blue-200"
            } ${highContrast ? "border-2" : ""} `}
          >
            {mooc.type === "Bundle" ? "📚" : "📖"} {mooc.type}
          </div>
          {mooc.courses && (
            <div
              className={`rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/80 ${highContrast ? "border-white/60 bg-white/20" : ""} `}
            >
              {mooc.courses.length} course{mooc.courses.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Bottom action area - enhanced accessibility */}
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

        {/* Enhanced floating particles with reduced motion consideration */}
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

const ProfileHeader = ({ profile }: { profile: ProfileData }) => {
  const { prefersReducedMotion, highContrast } = useAccessibility();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative overflow-hidden" role="banner">
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
              alt={`Professional photo of ${profile.name}`}
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                // Fallback for broken images
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=160&background=random`;
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
                  <i className={link.iconClass} aria-hidden="true" />

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

const App = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("Initializing...");
  const { prefersReducedMotion, highContrast } = useAccessibility();

  // Helper function to calculate total courses (including individual courses in bundles)
  const getTotalCourses = (data: MOOCsData) => {
    return data.items.reduce((total, item) => {
      if (item.type === "Bundle" && item.courses) {
        return total + item.courses.length;
      }
      return total + 1; // Individual course
    }, 0);
  };

  // Helper function to calculate completed courses
  const getCompletedCourses = (data: MOOCsData) => {
    return data.items.reduce((total, item) => {
      if (item.status === "Completed") {
        if (item.type === "Bundle" && item.courses) {
          return total + item.courses.length;
        }
        return total + 1;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Enhanced loading stages with progress
        const stages = [
          { stage: "Connecting to server...", progress: 20 },
          { stage: "Fetching learning data...", progress: 50 },
          { stage: "Processing certificates...", progress: 75 },
          { stage: "Finalizing portfolio...", progress: 90 },
          { stage: "Ready!", progress: 100 }
        ];

        // Simulate realistic loading progression
        for (const { stage, progress } of stages) {
          setLoadingStage(stage);
          setLoadingProgress(progress);
          await new Promise((resolve) =>
            setTimeout(resolve, prefersReducedMotion ? 100 : 400)
          );
        }

        const { data } = await axios.get<MOOCsData>(
          "https://moocs.aungmyokyaw.com/moocsData.json"
        );

        setMoocsData(data);
      } catch (error) {
        console.error("Error fetching MOOCs data:", error);
        setLoadingStage("Loading sample data...");

        // For demo purposes, set some sample data
        setMoocsData({
          total: 1,
          items: [
            {
              courseTitle: "Demo Course - Portfolio Showcase",
              status: "Completed",
              type: "Course",
              certificateLink: "#"
            }
          ]
        });
      } finally {
        // Final loading stage
        await new Promise((resolve) =>
          setTimeout(resolve, prefersReducedMotion ? 100 : 600)
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, [prefersReducedMotion]);

  if (isLoading || !moocsData) {
    return (
      <div
        className={`enhanced-loading-wrapper relative flex min-h-screen items-center justify-center overflow-hidden ${highContrast ? "bg-black" : ""} `}
      >
        {/* 3D background scene - conditionally rendered */}
        {!prefersReducedMotion && !highContrast && <Background3DScene />}

        {/* Enhanced liquid glass loading container */}
        <div className="relative z-10 text-center">
          <div
            className={`loading-glass-enhanced mx-auto max-w-xl p-20 ${highContrast ? "border-2 border-white/60 bg-black/80" : ""} `}
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
                  className={`rocket-icon-enhanced ${prefersReducedMotion ? "animate-none" : ""} `}
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
              className={`mb-6 text-4xl font-bold ${highContrast ? "text-white" : ""} `}
            >
              <span
                className={` ${highContrast ? "text-white" : "liquid-gradient-text"} ${prefersReducedMotion ? "animate-none" : "animate-text-glow"} `}
              >
                Loading Portfolio...
              </span>
            </h2>

            {/* Enhanced progress indicator */}
            <div className="mb-6">
              <div
                className={`progress-indicator mx-auto w-80 ${highContrast ? "bg-white/30" : ""} `}
              >
                <div
                  className={`progress-bar transition-all duration-500 ease-out ${highContrast ? "bg-white" : ""} `}
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div
                className={`progress-text mt-2 ${highContrast ? "text-white/90" : ""} `}
              >
                {loadingStage}
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
                } `}
              >
                Preparing your learning journey...
              </p>

              <div
                className={`flex items-center justify-center space-x-3 text-base ${highContrast ? "text-white/90" : "text-white/80"} `}
              >
                <span
                  className={` ${prefersReducedMotion ? "" : "floating-emoji-enhanced"} `}
                >
                  ✨
                </span>
                <span className="font-medium">
                  Loading certificates and achievements
                </span>
                <span
                  className={` ${prefersReducedMotion ? "" : "floating-emoji-enhanced"} `}
                  style={{ animationDelay: prefersReducedMotion ? "0s" : "1s" }}
                >
                  🎓
                </span>
              </div>
            </div>

            {/* Accessibility status for screen readers */}
            <div
              className="sr-only"
              role="status"
              aria-live="polite"
              aria-label={`Loading progress: ${loadingProgress}% complete. ${loadingStage}`}
            >
              {loadingStage} {loadingProgress}% complete
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Scene Background - conditional rendering */}
      {!prefersReducedMotion && !highContrast && <Background3DScene />}

      {/* Profile Header */}
      <ProfileHeader profile={profileData} />

      {/* Main Content with enhanced semantics */}
      <main className="container relative z-10 mx-auto px-6 py-16" role="main">
        {/* Section Header with better accessibility */}
        <section
          className="mb-16 text-center"
          aria-labelledby="learning-journey-title"
        >
          <div
            className={`mb-8 inline-block rounded-2xl border p-8 shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 ${
              highContrast
                ? "border-white/40 bg-black/60"
                : "border-white/20 bg-black/40"
            } `}
          >
            <h2
              id="learning-journey-title"
              className={`mb-6 text-5xl font-black drop-shadow-text-high ${highContrast ? "text-white" : "text-white"} `}
            >
              📚 My Learning Journey
            </h2>
            <p
              className={`mx-auto max-w-3xl text-lg leading-relaxed drop-shadow-text-medium ${highContrast ? "text-white" : "text-white/95"} `}
            >
              Discover my collection of completed courses and certifications.
              Each card represents a milestone in my continuous learning
              adventure.
              <span className="font-semibold text-white">
                {" "}
                Click any card to explore the certificate
              </span>{" "}
              and dive into the skills I've mastered. 🎓
            </p>
          </div>

          {/* Achievement stats with improved accessibility */}
          <div
            className="mt-8 flex flex-wrap justify-center gap-6"
            role="region"
            aria-label="Learning statistics"
          >
            <div
              className={`rounded-full border px-6 py-4 shadow-stats backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-stats-hover ${
                highContrast
                  ? "border-white/25 bg-black/70 hover:border-white/40"
                  : "border-white/15 bg-black/50 hover:border-white/25"
              } `}
            >
              <span
                className={`block text-2xl font-bold ${highContrast ? "text-green-200" : "text-green-300"} `}
              >
                {getCompletedCourses(moocsData)}
              </span>
              <p
                className={`mt-1 text-sm drop-shadow-text-medium ${highContrast ? "text-white" : "text-white/95"} `}
              >
                Courses Completed
              </p>
            </div>

            <div
              className={`rounded-full border px-6 py-4 shadow-stats backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-stats-hover ${
                highContrast
                  ? "border-white/25 bg-black/70 hover:border-white/40"
                  : "border-white/15 bg-black/50 hover:border-white/25"
              } `}
            >
              <span
                className={`block text-2xl font-bold ${highContrast ? "text-orange-200" : "text-orange-300"} `}
              >
                {
                  moocsData.items.filter(
                    (item) => item.status === "In Progress"
                  ).length
                }
              </span>
              <p
                className={`mt-1 text-sm drop-shadow-text-medium ${highContrast ? "text-white" : "text-white/95"} `}
              >
                In Progress
              </p>
            </div>

            <div
              className={`rounded-full border px-6 py-4 shadow-stats backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-stats-hover ${
                highContrast
                  ? "border-white/25 bg-black/70 hover:border-white/40"
                  : "border-white/15 bg-black/50 hover:border-white/25"
              } `}
            >
              <span
                className={`block text-2xl font-bold ${highContrast ? "text-blue-200" : "text-blue-300"} `}
              >
                {moocsData.items.length}
              </span>
              <p
                className={`mt-1 text-sm drop-shadow-text-medium ${highContrast ? "text-white" : "text-white/95"} `}
              >
                Specializations
              </p>
            </div>

            <div
              className={`rounded-full border px-6 py-4 shadow-stats backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-stats-hover ${
                highContrast
                  ? "border-white/25 bg-black/70 hover:border-white/40"
                  : "border-white/15 bg-black/50 hover:border-white/25"
              } `}
            >
              <span
                className={`block text-2xl font-bold ${highContrast ? "text-purple-200" : "text-purple-300"} `}
              >
                {getTotalCourses(moocsData)}
              </span>
              <p
                className={`mt-1 text-sm drop-shadow-text-medium ${highContrast ? "text-white" : "text-white/95"} `}
              >
                Total Courses
              </p>
            </div>
          </div>
        </section>

        {/* MOOC Grid with Enhanced Accessibility */}
        <section
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Course certificates"
        >
          {moocsData.items.map((mooc, index) => (
            <MOOCCard key={mooc.courseTitle} mooc={mooc} index={index} />
          ))}
        </section>

        {/* Enhanced Call-to-Action Button */}
        <section className="mt-20 text-center">
          <a
            href="https://github.com/AungMyoKyaw/MOOCs"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4"
            aria-label="Explore complete learning repository on GitHub"
          >
            {/* Enhanced button with better accessibility */}
            <div className="relative">
              {/* Background with enhanced glass effect */}
              <div
                className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl ${
                  highContrast
                    ? "bg-white/20"
                    : "bg-gradient-to-r from-purple-600/30 to-blue-600/30"
                } `}
              />

              {/* Main button container */}
              <div
                className={`relative rounded-2xl border-2 px-8 py-6 shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                  highContrast
                    ? "border-white/40 bg-black/60 group-hover:border-white/60"
                    : "border-white/20 bg-black/40 group-hover:border-white/40"
                } `}
              >
                <span className="flex items-center justify-center text-lg font-bold tracking-wide text-white">
                  {/* Enhanced icon with better spacing */}
                  <span
                    className={`mr-3 text-2xl ${prefersReducedMotion ? "" : "group-hover:animate-pulse"} `}
                  >
                    🌟
                  </span>

                  {/* Main text with improved typography */}
                  <span
                    className={`text-xl font-bold leading-tight tracking-tight drop-shadow-card-title transition-colors duration-300 group-hover:text-white ${highContrast ? "text-white" : "text-white"} `}
                  >
                    Explore All My Learning Adventures
                  </span>

                  {/* Enhanced arrow with smooth animation */}
                  <svg
                    className={`ml-3 h-6 w-6 transform transition-all duration-300 group-hover:text-cyan-300 ${prefersReducedMotion ? "" : "group-hover:translate-x-2"} `}
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
                </span>

                {/* Subtle description for better context */}
                <p
                  className={`mt-2 text-sm transition-colors duration-300 group-hover:text-white/90 ${highContrast ? "text-white/90" : "text-white/70"} `}
                >
                  View complete repository with certificates and learning
                  journey
                </p>
              </div>
            </div>
          </a>
        </section>
      </main>

      {/* ✨ Liquid Effects System - conditional */}
      {!prefersReducedMotion && !highContrast && <LiquidBackgroundEffects />}
    </div>
  );
};

export default App;
