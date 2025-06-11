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
const MOOCCard = ({
  mooc,
  index
}: {
  mooc: MOOCItem;
  index: number;
}) => {
  const handleClick = () => {
    // Open certificate directly
    window.open(mooc.certificateLink, '_blank');
  };

  const cardColor = mooc.status === 'Completed' ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-yellow-600';
  const glowColor = mooc.status === 'Completed' ? 'shadow-green-500/50' : 'shadow-orange-500/50';

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-110"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`View certificate for ${mooc.courseTitle}`}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${cardColor} rounded-xl blur-lg ${glowColor} shadow-2xl opacity-75`} />

      {/* Card content */}
      <div className={`
        relative bg-gradient-to-br ${cardColor} p-6 rounded-xl border-2 border-white/20
        backdrop-blur-sm transition-all duration-300 hover:border-white/40
      `}>
        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold">
            {mooc.status === 'Completed' ? '� COMPLETED' : '📚 IN PROGRESS'}
          </div>
        </div>

        {/* Course title */}
        <h3 className="text-white font-bold text-lg mb-2 pr-24">
          {mooc.courseTitle.length > 50 ? `${mooc.courseTitle.substring(0, 50)}...` : mooc.courseTitle}
        </h3>

        {/* Course details */}
        <div className="flex items-center space-x-4 text-white/80 text-sm">
          <span className="bg-white/20 px-2 py-1 rounded">
            {mooc.status}
          </span>
          <span className="bg-white/20 px-2 py-1 rounded">
            {mooc.type}
          </span>
          {mooc.courses && (
            <span className="bg-white/20 px-2 py-1 rounded">
              {mooc.courses.length} courses
            </span>
          )}
        </div>

        {/* Certificate link hint */}
        <div className="mt-4 text-white/60 text-xs flex items-center">
          <span className="mr-1">🔗</span>
          Click to view certificate
        </div>
      </div>
    </div>
  );
};

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <header className="relative animate-fade-in border-b border-cyan-500/30 bg-gradient-to-r from-black/80 to-purple-900/80 p-6 text-center backdrop-blur-md">
    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-cyan-400 shadow-lg sm:h-32 sm:w-32 animate-pulse">
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
          className="text-2xl text-cyan-300 transition hover:text-white hover:scale-110 transform"
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
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`loading-particle-${i}`}
              className="absolute bg-cyan-400 rounded-full opacity-20 animate-ping"
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

        <div className="text-center text-cyan-300 relative z-10">
          <div className="text-6xl mb-4 animate-bounce">🚀</div>
          <h2 className="text-2xl font-bold mb-2">Loading Portfolio...</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <span>Preparing your learning journey...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-cyan-100 overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={`bg-particle-${i}`}
            className="absolute bg-cyan-400 rounded-full opacity-10 animate-pulse"
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
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            📚 My Learning Journey
          </h2>
          <p className="text-cyan-200 max-w-2xl mx-auto">
            Explore my collection of completed courses and certifications. Each card represents a milestone
            in my continuous learning journey. Click on any card to view the certificate and learn more
            about the skills I've acquired. �
          </p>
        </div>

        {/* MOOC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {moocsData.items.map((mooc, index) => (
            <MOOCCard
              key={mooc.courseTitle}
              mooc={mooc}
              index={index}
            />
          ))}
        </div>

        {/* More link */}
        {moocsData.moreLink && (
          <div className="text-center mt-12">
            <a
              href={moocsData.moreLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-purple-600 transition transform hover:scale-105"
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
