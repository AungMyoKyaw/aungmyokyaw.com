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

    // Optionally, update the year in case you need it to refresh or if you add more dynamic logic later
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);

  return (
    <div className="min-h-screen bg-secondary font-sans text-primary">
      {/* Header */}
      <header className="bg-primary p-4 text-center text-white shadow-lg sm:p-6">
        <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-accent sm:h-24 sm:w-24">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-xl font-bold sm:text-2xl lg:text-4xl">
          {profileData.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base lg:text-lg">
          {profileData.title}
        </p>
        <div className="mt-4 flex justify-center space-x-2 sm:space-x-4">
          {profileData.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              className="text-base transition duration-300 hover:text-accent sm:text-xl"
              rel="noreferrer"
              aria-label={link.label}
            >
              <i className={`${link.iconClass}`}></i>
            </a>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-screen-lg px-4 py-8">
        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="mb-4 border-b-2 border-accent text-lg font-bold sm:text-2xl">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsData.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs text-primary shadow-sm transition hover:bg-accent/20 sm:px-4 sm:py-2 sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* MOOCs Section */}
        {moocsData && (
          <section id="moocs-section" className="mb-12">
            <h2 className="mb-4 border-b-2 border-accent text-lg font-bold sm:text-2xl">
              MOOCs
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {moocsData.items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-md sm:p-4"
                >
                  {/* Main Course Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={item.certificateLink}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer text-sm font-semibold text-primary hover:text-accent sm:text-lg"
                    >
                      {item.courseTitle}
                    </a>
                    <a
                      href={item.certificateLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-xs font-medium ${
                        item.status === "In Progress"
                          ? "pointer-events-none text-muted"
                          : "text-accent"
                      } hover:underline sm:text-sm`}
                    >
                      {item.status === "Completed"
                        ? "View Certificate"
                        : "In Progress"}
                    </a>
                  </div>

                  {/* Sub-Courses if Bundle */}
                  {item.type === "Bundle" && item.courses && (
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm font-semibold sm:text-base">
                        Included Courses:
                      </h3>
                      {item.courses.map((subCourse, subIndex) => (
                        <blockquote
                          key={subIndex}
                          className="flex justify-between border-l-4 border-accent pl-3 text-xs italic text-primary/80 sm:text-sm"
                        >
                          <a
                            href={subCourse.certificateLink}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-primary hover:text-accent"
                          >
                            {subCourse.title}
                          </a>
                        </blockquote>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {educationData.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 border-b-2 border-accent text-lg font-bold sm:text-2xl">
              Education
            </h2>
            {educationData.map((item, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg bg-white p-3 shadow-md sm:p-4"
              >
                <h3 className="text-base font-semibold sm:text-xl">
                  {item.degree}
                </h3>
                <p className="text-xs text-muted sm:text-sm">
                  {item.university || item.school}, Class of{" "}
                  {item.graduationYear}
                </p>
                {item.GPA && (
                  <p className="text-xs sm:text-sm">GPA: {item.GPA}</p>
                )}
                {item.distinctions && (
                  <ul className="list-disc pl-4 text-xs sm:text-sm">
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
      <footer className="bg-primary py-6 text-center text-white">
        <div className="container mx-auto px-4 sm:flex sm:items-center sm:justify-center">
          <p className="text-sm sm:text-base">
            © {currentYear} Aung Myo Kyaw. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
