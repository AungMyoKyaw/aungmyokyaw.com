import React, { useEffect, useState } from "react";
import axios from "axios";

// Type Definitions
interface ProfileData {
  name: string;
  image: string;
  title: string;
  socialLinks: {
    href: string;
    iconClass: string;
    label: string;
  }[];
}

interface EducationItem {
  degree: string;
  university?: string;
  school?: string;
  graduationYear?: string;
  GPA?: string;
  distinctions?: string[];
  finalProject?: string;
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

const educationData: EducationItem[] = [];

const skillsData: string[] = [
  "Programming",
  "Leadership",
  "Problem Solving",
  "Learning"
];

const App: React.FC = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    const fetchMoocsData = async () => {
      try {
        const { data } = await axios.get<MOOCsData>(
          "https://moocs.aungmyokyaw.com/moocsData.json"
        );
        setMoocsData(data);
      } catch (error) {
        console.error("Error fetching MOOCs data:", error);
      }
    };

    fetchMoocsData();
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
      {/* Header */}
      <header className="border-b border-blue-700 bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-center shadow-2xl sm:p-8">
        <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-gray-100 shadow-md sm:h-28 sm:w-28">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-wide text-white sm:text-4xl">
          {profileData.name}
        </h1>
        <p className="mt-1 text-base text-blue-200 sm:text-xl">
          {profileData.title}
        </p>
        <div className="mt-4 flex justify-center space-x-4 sm:space-x-6">
          {profileData.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="text-xl text-white transition duration-300 hover:text-blue-300 sm:text-3xl"
            >
              <i className={`${link.iconClass}`}></i>
            </a>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Skills Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="mb-4 border-b-2 border-blue-800 text-2xl font-semibold tracking-wide sm:mb-6 sm:text-3xl">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {skillsData.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-800 px-3 py-1 text-sm font-medium text-blue-200 shadow-md transition hover:bg-blue-700 sm:px-5 sm:py-2 sm:text-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* MOOCs Section */}
        {moocsData && (
          <section id="moocs-section" className="mb-8 sm:mb-12">
            <h2 className="mb-4 border-b-2 border-blue-800 text-2xl font-semibold tracking-wide sm:mb-6 sm:text-3xl">
              MOOCs
            </h2>
            <div className="space-y-4 sm:space-y-8">
              {moocsData.items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-md transition hover:shadow-xl sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={item.certificateLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl font-semibold text-gray-100 transition hover:text-blue-400 sm:text-2xl"
                    >
                      {item.courseTitle}
                    </a>
                    <a
                      href={item.certificateLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-2 whitespace-nowrap text-base font-medium sm:mt-0 sm:text-lg ${
                        item.status === "In Progress"
                          ? "text-gray-500"
                          : "text-blue-400 hover:underline"
                      }`}
                    >
                      {item.status === "Completed"
                        ? "View Certificate"
                        : "In Progress"}
                    </a>
                  </div>

                  {item.type === "Bundle" && item.courses && (
                    <div className="mt-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-100 sm:text-xl">
                        Included Courses:
                      </h3>
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
        )}

        {/* Education Section */}
        {educationData.length > 0 && (
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 border-b-2 border-blue-800 text-2xl font-semibold tracking-wide sm:mb-6 sm:text-3xl">
              Education
            </h2>
            {educationData.map((item, index) => (
              <div
                key={index}
                className="mb-4 rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-md transition hover:shadow-xl sm:mb-8 sm:p-8"
              >
                <h3 className="text-xl font-semibold text-gray-100 sm:text-2xl">
                  {item.degree}
                </h3>
                <p className="mt-1 text-base text-gray-400 sm:text-lg">
                  {item.university || item.school}, Class of{" "}
                  {item.graduationYear}
                </p>
                {item.GPA && (
                  <p className="mt-1 text-base text-gray-400 sm:text-lg">
                    GPA: {item.GPA}
                  </p>
                )}
                {item.distinctions && (
                  <ul className="mt-2 list-disc pl-4 text-sm text-gray-400 sm:pl-6 sm:text-base">
                    {item.distinctions.map((distinction, idx) => (
                      <li key={idx}>{distinction}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-800 bg-blue-900 py-4 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-blue-200 sm:text-lg">
            © {currentYear} Aung Myo Kyaw. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
