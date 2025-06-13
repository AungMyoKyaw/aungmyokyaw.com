import type { MOOCsData, ProfileData } from "../../../types";
import { useAccessibility } from "../../../contexts";
import { getCourseStats } from "../../../utils";
import { Background3DScene, LiquidBackgroundEffects } from "../../3d";
import { ProfileHeader, SectionHeader } from "../../layout";
import { CourseGrid, LearningStats } from "../../education";

interface EducationPortfolioPageProps {
  data: MOOCsData;
  profile: ProfileData;
}

export const EducationPortfolioPage = ({
  data,
  profile
}: EducationPortfolioPageProps) => {
  const { prefersReducedMotion, highContrast } = useAccessibility();
  const stats = getCourseStats(data);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Scene Background - conditional rendering */}
      {!prefersReducedMotion && !highContrast && <Background3DScene />}

      {/* Profile Header */}
      <ProfileHeader profile={profile} />

      {/* Main Content with enhanced semantics */}
      <main className="container relative z-10 mx-auto px-6 py-16">
        {/* Section Header */}
        <SectionHeader
          title="📚 My Learning Journey"
          description="Discover my collection of completed courses and certifications. Each card represents a milestone in my continuous learning adventure."
        />

        {/* Achievement stats */}
        <LearningStats stats={stats} />

        {/* Course Grid */}
        <CourseGrid data={data} />

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
                }`}
              />

              {/* Main button container */}
              <div
                className={`relative rounded-2xl border-2 px-8 py-6 shadow-glass backdrop-blur-2xl backdrop-brightness-115 backdrop-saturate-200 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                  highContrast
                    ? "border-white/40 bg-black/60 group-hover:border-white/60"
                    : "border-white/20 bg-black/40 group-hover:border-white/40"
                }`}
              >
                <span className="flex items-center justify-center text-lg font-bold tracking-wide text-white">
                  {/* Enhanced icon with better spacing */}
                  <span
                    className={`mr-3 text-2xl ${
                      prefersReducedMotion ? "" : "group-hover:animate-pulse"
                    }`}
                  >
                    🌟
                  </span>

                  {/* Main text with improved typography */}
                  <span
                    className={`text-xl font-bold leading-tight tracking-tight drop-shadow-card-title transition-colors duration-300 group-hover:text-white ${
                      highContrast ? "text-white" : "text-white"
                    }`}
                  >
                    Explore All My Learning Adventures
                  </span>

                  {/* Enhanced arrow with smooth animation */}
                  <svg
                    className={`ml-3 h-6 w-6 transform transition-all duration-300 group-hover:text-cyan-300 ${
                      prefersReducedMotion ? "" : "group-hover:translate-x-2"
                    }`}
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
                  className={`mt-2 text-sm transition-colors duration-300 group-hover:text-white/90 ${
                    highContrast ? "text-white/90" : "text-white/70"
                  }`}
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
