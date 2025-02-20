import React, { useEffect, useState } from "react";
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
}

// Data
const profileData: ProfileData = {
  name: "Aung Myo Kyaw",
  image: "https://avatars.githubusercontent.com/u/9404824?v=4",
  title: "Tech Lead | Curious Programmer | Lifelong Learner",
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/aungmyokyaw/",
      iconClass: "fab fa-linkedin",
      label: "LinkedIn Profile"
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github",
      label: "GitHub Profile"
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap",
      label: "Coursera Profile"
    }
  ]
};

const skillsData: string[] = [
  "Programming",
  "Leadership",
  "Problem Solving",
  "Learning"
];

// Data Fetching Service
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

// Components
const ProfileHeader: React.FC<{ profile: ProfileData }> = ({ profile }) => (
  <header className="border-b border-blue-700 bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-center shadow-2xl sm:p-8">
    <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-gray-100 shadow-md sm:h-28 sm:w-28">
      <img
        src={profile.image}
        alt={profile.name}
        className="h-full w-full object-cover"
      />
    </div>
    <h1 className="mt-4 text-2xl font-bold tracking-wide text-white sm:text-4xl">
      {profile.name}
    </h1>
    <p className="mt-1 text-base text-blue-200 sm:text-xl">{profile.title}</p>
    <div className="mt-4 flex justify-center space-x-4 sm:space-x-6">
      {profile.socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="text-xl text-white transition duration-300 hover:text-blue-300 sm:text-3xl"
        >
          <i className={link.iconClass}></i>
        </a>
      ))}
    </div>
  </header>
);

const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => (
  <section className="mb-8 sm:mb-12">
    <h2 className="mb-4 border-b-2 border-blue-800 text-2xl font-semibold tracking-wide sm:mb-6 sm:text-3xl">
      Skills
    </h2>
    <div className="flex flex-wrap gap-2 sm:gap-4">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="rounded-full bg-blue-800 px-3 py-1 text-sm font-medium text-blue-200 shadow-md transition hover:bg-blue-700 sm:px-5 sm:py-2 sm:text-lg"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

const MoocsSection: React.FC<{ moocsData: MOOCsData | null }> = ({
  moocsData
}) =>
  moocsData ? (
    <section className="mb-8 sm:mb-12">
      <h2 className="mb-4 border-b-2 border-blue-800 text-2xl font-semibold tracking-wide sm:mb-6 sm:text-3xl">
        MOOCs
      </h2>
      <div className="space-y-4 sm:space-y-8">
        {moocsData.items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-md transition hover:shadow-xl sm:p-8"
          >
            <a
              href={item.certificateLink}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-semibold text-gray-100 transition hover:text-blue-400 sm:text-2xl"
            >
              {item.courseTitle}
            </a>
            {item.type === "Bundle" && item.courses && (
              <div className="mt-4">
                <ul className="space-y-1 sm:space-y-2">
                  {item.courses.map((subCourse, subIndex) => (
                    <li
                      key={subIndex}
                      className="flex items-center space-x-2 sm:space-x-3"
                    >
                      <i className="fas fa-check-circle text-blue-400"></i>
                      <a
                        href={subCourse.certificateLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base font-medium text-gray-300 transition hover:text-blue-400 sm:text-lg"
                      >
                        {subCourse.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  ) : null;

const Footer: React.FC = () => (
  <footer className="border-t border-blue-800 bg-blue-900 py-4 sm:py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm text-blue-200 sm:text-lg">
        &copy; {new Date().getFullYear()} Aung Myo Kyaw. All rights reserved.
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);

  useEffect(() => {
    fetchMoocsData().then(setMoocsData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
      <ProfileHeader profile={profileData} />
      <main className="container mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <SkillsSection skills={skillsData} />
        <MoocsSection moocsData={moocsData} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
