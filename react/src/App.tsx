import React from "react";

// Type definitions for the data structures
interface ProfileData {
  name: string;
  image: string;
  title: string;
  socialLinks: {
    href: string;
    iconClass: string;
  }[];
}

interface EducationItem {
  degree: string;
  university?: string; // Make this optional since 'school' can be used
  school?: string; // Add 'school' as an optional property
  status?: string;
  graduationYear?: string;
  GPA?: string;
  distinctions?: string[];
  finalProject?: string;
  grade?: string; // Add 'grade' as an optional property
}

interface MOOCItem {
  courseTitle: string;
  type: "Course" | "Bundle";
  status: "In Progress" | "Completed";
  certificateLink: string;
  courses?: {
    title: string;
    certificateLink: string;
  }[];
}

interface MOOCsData {
  total: number;
  items: MOOCItem[];
  moreLink: string;
}

interface BlogPost {
  title: string;
  link: string;
}

// Data Definition
const profileData: ProfileData = {
  name: "Aung Myo Kyaw",
  image: "https://avatars.githubusercontent.com/u/9404824?v=4",
  title: "Tech Lead | Curious Programmer | Lifelong Learner",
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/aungmyokyaw/",
      iconClass: "fab fa-linkedin"
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github"
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap"
    }
  ]
};

const educationData: EducationItem[] = [
  {
    degree: "Master of Science in Information Technology (MSIT)",
    university: "University of the People",
    status: "In Progress",
    graduationYear: ""
  },
  {
    degree: "Applied Data Science Lab",
    university: "WorldQuant University",
    graduationYear: "2023"
  },
  {
    degree: "Full Stack Web Development Certification",
    university: "freeCodeCamp",
    graduationYear: "2017"
  },
  {
    degree:
      "Bachelor of Engineering (Aerospace - Propulsion and Flight Vehicles)",
    university: "Myanmar Aerospace Engineering University",
    graduationYear: "2016",
    GPA: "4.34 out of 5",
    distinctions: ["Aerospace Propulsion", "Design Project"],
    finalProject: "Design and Construction of Tricopter"
  },
  {
    degree: "High School Diploma",
    school: "No.3, Basic Education High School, Satthwa",
    graduationYear: "2010",
    grade: "438 out of 600",
    distinctions: ["Mathematics", "Chemistry", "Biology"]
  }
];

const skillsData: string[] = ["I can think", "I can wait", "I can fast"];

const moocsData: MOOCsData = {
  total: 1000,
  items: [
    {
      courseTitle: "Lorem Ipsum",
      type: "Course",
      status: "In Progress",
      certificateLink: "#"
    },
    {
      courseTitle: "Lorem Ipsum Specialization",
      type: "Bundle",
      status: "Completed",
      certificateLink: "specialization-certificate-link",
      courses: [
        {
          title: "Lorem Ipsum Course",
          certificateLink: "certificate-link-1"
        },
        {
          title: "Lorem Ipsum Course",
          certificateLink: "certificate-link-2"
        }
      ]
    },
    {
      courseTitle: "Lorem Ipsum",
      type: "Course",
      status: "Completed",
      certificateLink: "certificate-link-3"
    }
  ],
  moreLink: "https://www.coursera.org/learner/aungmyokyaw"
};

const blogPostsData: BlogPost[] = [
  {
    title: "Building Scalable Web Apps",
    link: "recent-blog-post-link-1"
  },
  {
    title: "Intro to Machine Learning",
    link: "recent-blog-post-link-2"
  }
];

// ProfileHeader Component
const ProfileHeader: React.FC<{ profile: ProfileData }> = ({ profile }) => (
  <header id="profile-header" className="mb-6 text-center sm:mb-10 md:mb-16">
    <img
      src={profile.image}
      alt={profile.name}
      className="mx-auto mb-4 h-20 w-20 rounded-full border-4 border-[#146321] shadow-lg sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-44 lg:w-44"
    />
    <h1 className="text-2xl font-semibold text-[#146321] sm:text-3xl md:text-4xl">
      {profile.name}
    </h1>
    <p className="mt-2 text-sm font-light text-[#146321] sm:text-base md:text-lg">
      {profile.title}
    </p>
    <div className="mt-4 flex justify-center space-x-3 sm:space-x-5 md:space-x-7">
      {profile.socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          className="text-[#146321] transition duration-300 hover:text-[#146321]"
          rel="noreferrer"
        >
          <i className={`${link.iconClass} text-lg sm:text-xl md:text-2xl`}></i>
        </a>
      ))}
    </div>
  </header>
);

// EducationSection Component
const EducationSection: React.FC<{ education: EducationItem[] }> = ({
  education
}) => (
  <section id="education-section" className="mb-10 px-2 sm:px-4 md:px-6">
    <h2 className="mb-4 border-b-2 border-[#146321]/30 pb-2 text-2xl font-bold text-[#146321] sm:text-3xl md:mb-6 md:pb-3 md:text-4xl">
      Education
    </h2>
    {education.map((item, index) => (
      <div
        key={index}
        className="mb-4 rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg md:mb-6 md:p-6"
      >
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold text-[#146321] sm:text-xl md:text-2xl">
              {item.degree}
            </p>
            <p className="mb-1 text-sm text-[#146321]/80 sm:text-base">
              {item.university || item.school}
            </p>
            {item.status && (
              <p className="text-xs italic text-[#146321]/60 sm:text-sm">
                Status: {item.status}
              </p>
            )}
          </div>
          {item.graduationYear && (
            <p className="mt-2 text-sm font-medium text-[#146321] md:mt-0">
              Class of {item.graduationYear}
            </p>
          )}
        </div>
        {item.GPA && (
          <p className="mt-2 text-xs text-[#146321]/90 sm:text-sm">
            GPA: {item.GPA}
          </p>
        )}
        {item.distinctions && item.distinctions.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-[#146321] sm:text-base">
              Distinctions:
            </p>
            <ul className="ml-3 list-inside list-disc text-xs text-[#146321]/80 sm:text-sm">
              {item.distinctions.map((distinction, idx) => (
                <li key={idx}>{distinction}</li>
              ))}
            </ul>
          </div>
        )}
        {item.finalProject && (
          <div className="mt-3">
            <p className="text-sm font-medium text-[#146321] sm:text-base">
              Final Project:
            </p>
            <p className="text-xs text-[#146321]/80 sm:text-sm">
              {item.finalProject}
            </p>
          </div>
        )}
      </div>
    ))}
  </section>
);

// SkillsSection Component
const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => (
  <section id="skills-section" className="mb-10 px-2 sm:px-4 md:px-6">
    <h2 className="mb-4 border-b-2 border-[#146321]/30 pb-2 text-2xl font-bold text-[#146321] sm:text-3xl md:mb-6 md:pb-3 md:text-4xl">
      Skills
    </h2>
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="rounded-full bg-[#146321]/20 px-3 py-1 text-xs font-medium text-[#146321] shadow-sm transition duration-300 hover:bg-[#146321]/30 sm:px-4 sm:py-2 sm:text-sm md:text-lg"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

// MOOCsSection Component
const MOOCsSection: React.FC<{ moocs: MOOCsData }> = ({ moocs }) => (
  <section id="moocs-section" className="mb-8 px-4 md:mb-12 md:px-8">
    <h2 className="mb-4 border-b-2 border-[#146321]/30 pb-2 text-2xl font-bold text-[#146321] md:mb-6 md:pb-3 md:text-3xl lg:text-4xl">
      Completed MOOCs
    </h2>
    <p className="mb-3 text-base font-light text-[#146321] md:mb-4 md:text-lg">
      Total Completed MOOCs: {moocs.total}
    </p>
    <div className="space-y-4 md:space-y-6">
      {moocs.items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg md:p-6"
        >
          <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <h3 className="text-lg font-semibold text-[#146321] md:text-xl lg:text-2xl">
              {item.courseTitle}
            </h3>
            <a
              href={item.certificateLink}
              target="_blank"
              className={`mt-1 text-[#146321] hover:underline md:mt-0 ${
                item.status === "In Progress"
                  ? "pointer-events-none text-[#146321]/50"
                  : ""
              }`}
              rel="noreferrer"
            >
              {item.status === "In Progress"
                ? "In Progress"
                : "View Certificate"}
            </a>
          </div>
          {item.type === "Bundle" && item.courses && (
            <div className="mt-3 space-y-2 md:mt-4">
              {item.courses.map((course, courseIndex) => (
                <blockquote
                  key={courseIndex}
                  className="border-l-4 border-[#146321] bg-[#f8f8f8] p-3 text-[#146321]/80 md:p-4"
                >
                  <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
                    <p className="text-sm font-medium md:text-base">
                      {course.title}
                    </p>
                    <a
                      href={course.certificateLink}
                      target="_blank"
                      className="text-xs text-[#146321] hover:underline md:text-sm"
                      rel="noreferrer"
                    >
                      View Certificate
                    </a>
                  </div>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="mt-5 text-center md:mt-6">
        <a
          href={moocs.moreLink}
          target="_blank"
          className="inline-block text-sm font-medium text-[#146321] underline transition duration-300 hover:text-[#146321] md:text-base"
          rel="noreferrer"
        >
          View All Courses
        </a>
      </div>
    </div>
  </section>
);

// BlogSection Component
const BlogSection: React.FC<{ blogPosts: BlogPost[] }> = ({ blogPosts }) => (
  <section id="blog-section" className="mb-10 px-2 sm:px-4 md:px-6">
    <h2 className="mb-4 border-b-2 border-[#146321]/30 pb-2 text-2xl font-bold text-[#146321] sm:text-3xl md:mb-6 md:pb-3 md:text-4xl">
      Recent Blog Posts
    </h2>
    <ul className="space-y-3 sm:space-y-4 md:space-y-6">
      {blogPosts.map((post, index) => (
        <li
          key={index}
          className="rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-5 md:p-6"
        >
          <a
            href={post.link}
            target="_blank"
            className="block text-sm font-medium text-[#146321] hover:underline sm:text-base md:text-lg"
            rel="noreferrer"
          >
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

// Main App Component
const App: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-[#146321]">
    <div className="container mx-auto max-w-screen-lg flex-grow p-6">
      <ProfileHeader profile={profileData} />
      <EducationSection education={educationData} />
      <SkillsSection skills={skillsData} />
      <MOOCsSection moocs={moocsData} />
      <BlogSection blogPosts={blogPostsData} />
    </div>
  </div>
);

export default App;

// ----
// adjust the layout of the components for mobile responsiveness
// we are now start supporting from iphone se 1st gen
