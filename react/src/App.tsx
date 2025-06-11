import { useEffect, useState } from "react";
import axios from "axios";

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
  const handleClick = () => {
    // Open certificate directly
    window.open(mooc.certificateLink, "_blank");
  };

  const cardColor =
    mooc.status === "Completed"
      ? "from-green-500 to-emerald-600"
      : "from-orange-500 to-yellow-600";
  const glowColor =
    mooc.status === "Completed"
      ? "shadow-green-500/50"
      : "shadow-orange-500/50";

  return (
    <div
      className="group relative transform cursor-pointer transition-all duration-500 hover:scale-110"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`View certificate for ${mooc.courseTitle}`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${cardColor} rounded-xl blur-lg ${glowColor} opacity-75 shadow-2xl`}
      />

      {/* Card content */}
      <div
        className={`relative bg-gradient-to-br ${cardColor} rounded-xl border-2 border-white/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/40`}
      >
        {/* Status badge */}
        <div className="absolute right-2 top-2">
          <div className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold text-white">
            {mooc.status === "Completed" ? "✅ COMPLETED" : "📚 IN PROGRESS"}
          </div>
        </div>

        {/* Course title */}
        <h3 className="mb-2 pr-24 text-lg font-bold text-white">
          {mooc.courseTitle.length > 50
            ? `${mooc.courseTitle.substring(0, 50)}...`
            : mooc.courseTitle}
        </h3>

        {/* Course details */}
        <div className="flex items-center space-x-4 text-sm text-white/80">
          <span className="rounded bg-white/20 px-2 py-1">{mooc.status}</span>
          <span className="rounded bg-white/20 px-2 py-1">{mooc.type}</span>
          {mooc.courses && (
            <span className="rounded bg-white/20 px-2 py-1">
              {mooc.courses.length} courses
            </span>
          )}
        </div>

        {/* Certificate link hint */}
        <div className="mt-4 flex items-center text-xs text-white/60">
          <span className="mr-1">🔗</span>
          Click to view certificate
        </div>
      </div>
    </div>
  );
};

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <header className="animate-fade-in relative border-b border-cyan-500/30 bg-gradient-to-r from-black/80 to-purple-900/80 p-6 text-center backdrop-blur-md">
    <div className="mx-auto h-24 w-24 animate-pulse overflow-hidden rounded-full border-4 border-cyan-400 shadow-lg sm:h-32 sm:w-32">
      <img
        src={profile.image}
        alt={profile.name}
        className="h-full w-full object-cover"
      />
    </div>
    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-cyan-300 sm:text-5xl">
      {profile.name}
    </h1>
    <p className="mt-2 text-base text-cyan-200 sm:text-xl">{profile.title}</p>
    <div className="mt-4 flex justify-center space-x-4">
      {profile.socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="transform text-2xl text-cyan-300 transition hover:scale-110 hover:text-white"
        >
          <i className={link.iconClass} />
        </a>
      ))}
    </div>
  </header>
);

const App = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);

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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-900 to-blue-900">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`loading-particle-${i}`}
              className="absolute animate-ping rounded-full bg-cyan-400 opacity-20"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-cyan-300">
          <div className="mb-4 animate-bounce text-6xl">🚀</div>
          <h2 className="mb-2 text-2xl font-bold">Loading Portfolio...</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <span>Preparing your learning journey...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-purple-900 to-blue-900 text-cyan-100">
      {/* Animated background particles */}
      <div className="pointer-events-none fixed inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={`bg-particle-${i}`}
            className="absolute animate-pulse rounded-full bg-cyan-400 opacity-10"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Profile Header */}
      <ProfileHeader profile={profileData} />

      {/* Main Content */}
      <main className="container relative z-10 mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
            📚 My Learning Journey
          </h2>
          <p className="mx-auto max-w-2xl text-cyan-200">
            Explore my collection of completed courses and certifications. Each
            card represents a milestone in my continuous learning journey. Click
            on any card to view the certificate and learn more about the skills
            I've acquired. 🎓
          </p>
        </div>

        {/* MOOC Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {moocsData.items.map((mooc, index) => (
            <MOOCCard key={mooc.courseTitle} mooc={mooc} index={index} />
          ))}
        </div>

        {/* More link */}
        {moocsData.moreLink && (
          <div className="mt-12 text-center">
            <a
              href={moocsData.moreLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block transform rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 font-bold text-white transition hover:scale-105 hover:from-cyan-600 hover:to-purple-600"
            >
              🌟 View All My MOOCs →
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
