import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";
import Scene3D from "./components/Scene3D";
import Avatar3D from "./components/Avatar3D";
import { MOOCs3D } from "./components/MOOCs3D";

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
  <div className="rounded-xl border border-blue-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-6 shadow-[0_0_30px_5px_rgba(0,120,255,0.3)] backdrop-blur-sm transition hover:shadow-[0_0_40px_10px_rgba(0,180,255,0.4)]">
    {children}
  </div>
);

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <header className="relative animate-fade-in border-b border-cyan-500/30 bg-black/20 p-6 text-center backdrop-blur-md sm:p-8">
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
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    fetchMoocsData().then(setMoocsData);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black to-gray-900 text-cyan-100">
      {/* 3D Background */}
      {show3D && <Scene3D />}

      {/* 3D Scene for interactive elements */}
      {show3D && (
        <div className="fixed inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 20], fov: 75 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />

            {/* 3D Avatar */}
            <Avatar3D imageUrl={profileData.image} position={[-8, 5, -5]} />

            {/* 3D MOOCs */}
            <MOOCs3D moocsData={moocsData} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 3}
              autoRotate
              autoRotateSpeed={0.2}
            />
          </Canvas>
        </div>
      )}

      {/* Traditional UI overlay */}
      <div className="relative z-10">
        <ProfileHeader profile={profileData} />

        {/* Toggle 3D button */}
        <div className="fixed top-4 right-4 z-20">
          <button
            type="button"
            onClick={() => setShow3D(!show3D)}
            className="rounded-lg bg-cyan-600/20 px-4 py-2 text-cyan-300 backdrop-blur-sm transition hover:bg-cyan-600/30 hover:text-white"
          >
            {show3D ? '2D Mode' : '3D Mode'}
          </button>
        </div>

        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <GlowingCard>
            <h2 className="mb-4 text-2xl font-semibold text-cyan-300">
              My MOOCs {show3D && <span className="text-sm opacity-75">(Also visible in 3D!)</span>}
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
              <p className="text-cyan-400">Loading MOOCs...</p>
            )}
          </GlowingCard>
        </main>
      </div>
    </div>
  );
};

export default App;
