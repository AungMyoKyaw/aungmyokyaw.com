import { useEffect, useState } from "react";
import axios from "axios";

// Types
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

const fetchMoocsData = async (): Promise<MOOCsData | null> => {
  try {
    const { data } = await axios.get<MOOCsData>(
      "https://moocs.aungmyokyaw.com/moocsData.json"
    );
    return data;
  } catch (error) {
    console.error("Error fetching MOOCs data:", error);
    return null;
  }
};

const GlowingCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-blue-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 shadow-[0_0_30px_5px_rgba(0,120,255,0.3)] transition hover:shadow-[0_0_40px_10px_rgba(0,180,255,0.4)]">
    {children}
  </div>
);

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <header className="animate-fade-in border-b border-cyan-500 bg-black/80 p-6 text-center backdrop-blur sm:p-8">
    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-cyan-400 shadow-md sm:h-32 sm:w-32">
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
          className="text-2xl text-cyan-300 transition hover:text-white"
        >
          <i className={link.iconClass} />
        </a>
      ))}
    </div>
  </header>
);

const App = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);
  const [show3D, setShow3D] = useState(false); // Start with 2D mode for debugging

  useEffect(() => {
    fetchMoocsData().then(setMoocsData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-cyan-100">
      <ProfileHeader profile={profileData} />
      
      {/* Simple toggle button */}
      <div className="fixed top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setShow3D(!show3D)}
          className="rounded-lg bg-cyan-600/20 px-4 py-2 text-cyan-300 backdrop-blur-sm transition hover:bg-cyan-600/30 hover:text-white"
        >
          {show3D ? 'Disable 3D' : 'Enable 3D'}
        </button>
      </div>
      
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <GlowingCard>
          <h2 className="mb-4 text-2xl font-semibold text-cyan-300">
            My MOOCs
          </h2>
          {moocsData ? (
            <ul className="space-y-6">
              {moocsData.items.map((course) => (
                <li key={course.courseTitle}>
                  <a
                    href={course.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-bold text-white hover:underline"
                  >
                    {course.courseTitle}
                  </a>
                  {course.type === "Bundle" && course.courses && (
                    <ul className="mt-2 space-y-1 pl-5 text-cyan-300">
                      {course.courses.map((sub) => (
                        <li key={sub.title}>
                          <a
                            href={sub.certificateLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-base hover:underline"
                          >
                            ↳ {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {moocsData.moreLink && (
                <li className="mt-6 text-right">
                  <a
                    href={moocsData.moreLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline hover:text-white"
                  >
                    View all MOOCs →
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <div className="text-cyan-400">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                <span>Loading MOOCs...</span>
              </div>
            </div>
          )}
        </GlowingCard>
        
        {/* Debug info */}
        <div className="mt-8 rounded-lg bg-gray-800/50 p-4">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">Debug Info:</h3>
          <p className="text-sm text-cyan-200">3D Mode: {show3D ? 'Enabled' : 'Disabled'}</p>
          <p className="text-sm text-cyan-200">MOOCs Data: {moocsData ? `Loaded (${moocsData.items.length} items)` : 'Loading...'}</p>
          <p className="text-sm text-cyan-200">Page Status: Working ✅</p>
        </div>
      </main>
    </div>
  );
};

export default App;
