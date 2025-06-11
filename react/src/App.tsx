import { useEffect, useState } from "react";
import axios from "axios";
import Scene3D from "./components/Scene3D";
import LiquidEffects, { useRippleEffect } from "./components/LiquidEffects";

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    // Small delay for ripple effect
    setTimeout(() => {
      window.open(mooc.certificateLink, "_blank");
    }, 100);
  };

  const isCompleted = mooc.status === "Completed";

  return (
    <button
      className="group relative w-full animate-fade-in-up cursor-pointer border-none bg-transparent p-0 transition-all duration-500 ease-out"
      style={{
        animationDelay: `${index * 0.15}s`
      }}
      onClick={handleClick}
      aria-label={`View certificate for ${mooc.courseTitle}`}
    >
      {/* Clean, structured card layout */}
      <div className="glass-container-readable h-full min-h-[180px] rounded-2xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02]">
        {/* Header row with title and status */}
        <div className="mb-4 flex items-start justify-between">
          {/* Course title - clean left alignment */}
          <h3 className="card-title flex-1 pr-4 text-left text-lg leading-tight">
            {mooc.courseTitle.replace(" ⏳", "").length > 65
              ? `${mooc.courseTitle.replace(" ⏳", "").substring(0, 65)}...`
              : mooc.courseTitle.replace(" ⏳", "")}
          </h3>

          {/* Status indicator - compact and clean */}
          <div
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              isCompleted
                ? "border border-green-400/30 bg-green-500/20 text-green-300"
                : "border border-orange-400/30 bg-orange-500/20 text-orange-300"
            }`}
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
            }`}
          >
            {mooc.type === "Bundle" ? "📚" : "📖"} {mooc.type}
          </div>
          {mooc.courses && (
            <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/80">
              {mooc.courses.length} course{mooc.courses.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Bottom action area - enhanced contrast */}
        <div className="absolute bottom-4 left-6 right-6">
          <div className="card-action-text flex items-center justify-between transition-all duration-300 group-hover:text-white">
            <div className="flex items-center">
              <div
                className={`mr-2 h-2.5 w-2.5 rounded-full shadow-sm ${
                  isCompleted
                    ? "bg-green-400 shadow-green-400/50"
                    : "bg-orange-400 shadow-orange-400/50"
                }`}
              ></div>
              <span className="text-sm font-semibold">View Certificate</span>
            </div>
            <div className="transform transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="h-4 w-4 opacity-60 group-hover:opacity-100"
                fill="currentColor"
                viewBox="0 0 20 20"
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

        {/* Subtle floating particles effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          {[...Array(4)].map((_, i) => (
            <div
              key={`particle-${mooc.courseTitle}-${i}`}
              className="absolute h-1 w-1 animate-liquid-float rounded-full bg-white/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                left: `${25 + i * 20}%`,
                top: `${35 + i * 15}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${4 + i * 0.6}s`
              }}
            />
          ))}
        </div>
      </div>
    </button>
  );
};

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <header className="relative overflow-hidden">
    {/* Liquid glass header background */}
    <div className="frosted-glass absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-indigo-900/20"></div>
      {/* Animated background orbs */}
      <div className="absolute left-10 top-10 h-32 w-32 animate-liquid-float rounded-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-3xl"></div>
      <div
        className="absolute bottom-10 right-10 h-40 w-40 animate-liquid-float rounded-full bg-gradient-to-r from-pink-400/20 to-blue-500/20 blur-3xl"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>

    {/* Header content */}
    <div className="relative z-10 p-8 text-center">
      {/* Professional Avatar with enhanced visibility */}
      <div className="relative mx-auto mb-8 h-32 w-32 sm:h-40 sm:w-40">
        {/* Subtle glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-lg"></div>

        {/* Clean avatar container */}
        <div className="relative overflow-hidden rounded-full border-4 border-white/30 bg-white/10 backdrop-blur-md">
          <img
            src={profile.image}
            alt={profile.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
        </div>
      </div>

      {/* Name with improved contrast */}
      <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-6xl">
        <span className="text-white drop-shadow-lg">{profile.name}</span>
      </h1>

      {/* Title with improved readability */}
      <div className="mb-8 inline-block">
        <div className="glass-container-readable px-6 py-3">
          <p className="text-high-contrast text-lg font-medium sm:text-xl">
            {profile.title}
          </p>
        </div>
      </div>

      {/* Social links with improved visibility */}
      <div className="flex justify-center space-x-6">
        {profile.socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="group relative"
          >
            <div className="glass-container-readable micro-bounce text-high-contrast gpu-accelerated flex h-14 w-14 items-center justify-center text-xl transition-all duration-300 hover:text-white group-hover:scale-110">
              <i className={link.iconClass} />
              {/* Subtle hover effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </a>
        ))}
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
    </div>
  </header>
);

const App = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);

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
        const { data } = await axios.get<MOOCsData>(
          "https://moocs.aungmyokyaw.com/moocsData.json"
        );
        setMoocsData(data);
      } catch (error) {
        console.error("Error fetching MOOCs data:", error);
      }
    };

    fetchData();
  }, []);

  if (!moocsData) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* 3D background scene */}
        <Scene3D />

        {/* Liquid glass loading container */}
        <div className="relative z-10 text-center">
          <div className="liquid-glass mx-auto max-w-md p-12">
            {/* Animated loading icon */}
            <div className="relative mb-8">
              <div className="mx-auto flex h-20 w-20 animate-morphing-blob items-center justify-center rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-600/20">
                <div className="animate-liquid-glow text-4xl">🚀</div>
              </div>
              {/* Orbital rings */}
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-cyan-400/30"></div>
              <div
                className="absolute inset-2 animate-spin rounded-full border border-purple-400/20"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "3s"
                }}
              ></div>
            </div>

            <h2 className="mb-4 text-2xl font-bold">
              <span className="liquid-gradient-text">Loading Portfolio...</span>
            </h2>

            <div className="mb-4 flex items-center justify-center space-x-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <div
                className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>

            <p className="text-sm text-white/70">
              Preparing your learning journey...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Scene Background */}
      <Scene3D />

      {/* Profile Header */}
      <ProfileHeader profile={profileData} />

      {/* Main Content */}
      <main className="container relative z-10 mx-auto px-6 py-16">
        {/* Section Header with better readability */}
        <div className="mb-16 text-center">
          <div className="glass-container-readable mb-8 inline-block p-8">
            <h2 className="text-high-contrast mb-6 text-5xl font-black">
              📚 My Learning Journey
            </h2>
            <p className="text-medium-contrast mx-auto max-w-3xl text-lg leading-relaxed">
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

          {/* Achievement stats with improved contrast and meaningful counts */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="stats-card">
              <span className="block text-2xl font-bold text-green-300">
                {getCompletedCourses(moocsData)}
              </span>
              <p className="text-medium-contrast mt-1 text-sm">
                Courses Completed
              </p>
            </div>
            <div className="stats-card">
              <span className="block text-2xl font-bold text-orange-300">
                {
                  moocsData.items.filter(
                    (item) => item.status === "In Progress"
                  ).length
                }
              </span>
              <p className="text-medium-contrast mt-1 text-sm">In Progress</p>
            </div>
            <div className="stats-card">
              <span className="block text-2xl font-bold text-blue-300">
                {moocsData.items.length}
              </span>
              <p className="text-medium-contrast mt-1 text-sm">
                Specializations
              </p>
            </div>
            <div className="stats-card">
              <span className="block text-2xl font-bold text-purple-300">
                {getTotalCourses(moocsData)}
              </span>
              <p className="text-medium-contrast mt-1 text-sm">Total Courses</p>
            </div>
          </div>
        </div>

        {/* MOOC Grid with Staggered Animation */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {moocsData.items.map((mooc, index) => (
            <MOOCCard key={mooc.courseTitle} mooc={mooc} index={index} />
          ))}
        </div>

        {/* Enhanced Call-to-Action Button with Better Readability */}
        <div className="mt-20 text-center">
          <a
            href="https://github.com/AungMyoKyaw/MOOCs"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-block"
          >
            {/* Enhanced button with better contrast and readability */}
            <div className="relative">
              {/* Background with enhanced glass effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-xl transition-all duration-500 group-hover:blur-2xl"></div>

              {/* Main button container */}
              <div className="glass-container-readable relative rounded-2xl border-2 border-white/20 px-8 py-6 transition-all duration-500 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-2xl">
                <span className="flex items-center justify-center text-lg font-bold tracking-wide text-white">
                  {/* Enhanced icon with better spacing */}
                  <span className="mr-3 text-2xl group-hover:animate-pulse">
                    🌟
                  </span>

                  {/* Main text with improved typography */}
                  <span className="card-title text-xl transition-colors duration-300 group-hover:text-white">
                    Explore All My Learning Adventures
                  </span>

                  {/* Enhanced arrow with smooth animation */}
                  <svg
                    className="ml-3 h-6 w-6 transform transition-all duration-300 group-hover:translate-x-2 group-hover:text-cyan-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>

                {/* Subtle description for better context */}
                <p className="mt-2 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/90">
                  View complete repository with certificates and learning
                  journey
                </p>
              </div>
            </div>
          </a>
        </div>
      </main>

      {/* ✨ Liquid Effects System */}
      <LiquidEffects />
    </div>
  );
};

export default App;
