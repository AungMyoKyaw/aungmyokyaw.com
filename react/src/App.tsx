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
      iconClass: "fab fa-linkedin",
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github",
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap",
    },
  ],
};

const educationData: EducationItem[] = [
  {
    degree: "Master of Science in Information Technology (MSIT)",
    university: "University of the People",
    status: "In Progress",
    graduationYear: "",
  },
  {
    degree: "Applied Data Science Lab",
    university: "WorldQuant University",
    graduationYear: "2023",
  },
  {
    degree: "Full Stack Web Development Certification",
    university: "freeCodeCamp",
    graduationYear: "2017",
  },
  {
    degree:
      "Bachelor of Engineering (Aerospace - Propulsion and Flight Vehicles)",
    university: "Myanmar Aerospace Engineering University",
    graduationYear: "2016",
    GPA: "4.34 out of 5",
    distinctions: ["Aerospace Propulsion", "Design Project"],
    finalProject: "Design and Construction of Tricopter",
  },
  {
    degree: "High School Diploma",
    school: "No.3, Basic Education High School, Satthwa",
    graduationYear: "2010",
    grade: "438 out of 600",
    distinctions: ["Mathematics", "Chemistry", "Biology"],
  },
];

const skillsData: string[] = ["I can think", "I can wait", "I can fast"];

const moocsData: MOOCsData = {
  total: 1000,
  items: [
    {
      courseTitle: "Lorem Ipsum",
      type: "Course",
      status: "In Progress",
      certificateLink: "#",
    },
    {
      courseTitle: "Lorem Ipsum Specialization",
      type: "Bundle",
      status: "Completed",
      certificateLink: "specialization-certificate-link",
      courses: [
        {
          title: "Lorem Ipsum Course",
          certificateLink: "certificate-link-1",
        },
        {
          title: "Lorem Ipsum Course",
          certificateLink: "certificate-link-2",
        },
      ],
    },
    {
      courseTitle: "Lorem Ipsum",
      type: "Course",
      status: "Completed",
      certificateLink: "certificate-link-3",
    },
  ],
  moreLink: "https://www.coursera.org/learner/aungmyokyaw",
};

const blogPostsData: BlogPost[] = [
  {
    title: "Building Scalable Web Apps",
    link: "recent-blog-post-link-1",
  },
  {
    title: "Intro to Machine Learning",
    link: "recent-blog-post-link-2",
  },
];

// ProfileHeader Component
const ProfileHeader: React.FC<{ profile: ProfileData }> = ({ profile }) => (
  <header id="profile-header" className="text-center mb-10 sm:mb-16">
    <img
      src={profile.image}
      alt={profile.name}
      className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full mx-auto mb-6 border-4 border-[#146321] shadow-lg"
    />
    <h1 className="text-4xl md:text-5xl font-semibold text-[#146321]">
      {profile.name}
    </h1>
    <p className="text-lg md:text-xl mt-3 text-[#146321] font-light">
      {profile.title}
    </p>
    <div className="flex justify-center space-x-5 sm:space-x-7 mt-5">
      {profile.socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          className="text-[#146321] hover:text-[#146321] transition duration-300"
          rel="noreferrer"
        >
          <i className={`${link.iconClass} fa-2x`}></i>
        </a>
      ))}
    </div>
  </header>
);

// EducationSection Component
const EducationSection: React.FC<{ education: EducationItem[] }> = ({
  education,
}) => (
  <section id="education-section" className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-[#146321] border-b-2 border-[#146321]/30 pb-3 mb-6">
      Education
    </h2>
    {education.map((item, index) => (
      <div
        key={index}
        className="p-6 mb-6  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-2xl font-semibold text-[#146321]">
              {item.degree}
            </p>
            <p className="text-lg text-[#146321]/80 mb-2">{item.university}</p>
            {item.status && (
              <p className="italic text-sm text-[#146321]/60">
                Status: {item.status}
              </p>
            )}
          </div>
          {item.graduationYear && (
            <p className="text-md font-medium text-[#146321] mt-2 md:mt-0">
              Class of {item.graduationYear}
            </p>
          )}
        </div>
        {item.GPA && (
          <p className="mt-3 text-sm text-[#146321]/90">GPA: {item.GPA}</p>
        )}
        {item.distinctions && item.distinctions.length > 0 && (
          <div className="mt-4">
            <p className="text-md font-medium text-[#146321]">Distinctions:</p>
            <ul className="list-disc list-inside ml-4 text-[#146321]/80">
              {item.distinctions.map((distinction, idx) => (
                <li key={idx}>{distinction}</li>
              ))}
            </ul>
          </div>
        )}
        {item.finalProject && (
          <div className="mt-4">
            <p className="text-md font-medium text-[#146321]">Final Project:</p>
            <p className="text-[#146321]/80">{item.finalProject}</p>
          </div>
        )}
      </div>
    ))}
  </section>
);

// SkillsSection Component
const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => (
  <section id="skills-section" className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-[#146321] border-b-2 border-[#146321]/30 pb-3 mb-6">
      Skills
    </h2>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-[#146321]/20 text-[#146321] px-4 py-2 rounded-full text-lg font-medium shadow-sm hover:bg-[#146321]/30 transition duration-300"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

// MOOCsSection Component
const MOOCsSection: React.FC<{ moocs: MOOCsData }> = ({ moocs }) => (
  <section id="moocs-section" className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-[#146321] border-b-2 border-[#146321]/30 pb-3 mb-6">
      Completed MOOCs
    </h2>
    <p className="text-[#146321] text-lg font-light mb-4">
      Total Completed MOOCs: {moocs.total}
    </p>
    <div className="space-y-6">
      {moocs.items.map((item, index) => (
        <div key={index} className="p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h3 className="text-xl md:text-2xl font-semibold text-[#146321]">
              {item.courseTitle}
            </h3>
            <a
              href={item.certificateLink}
              target="_blank"
              className={`text-[#146321] hover:underline mt-2 md:mt-0 ${
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
            <div className="space-y-4">
              {item.courses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-lg p-4 border border-[#146321]/20"
                >
                  <p className="text-base md:text-lg font-medium text-[#146321]">
                    {course.title}
                  </p>
                  <a
                    href={course.certificateLink}
                    target="_blank"
                    className="text-[#146321] hover:underline mt-2 md:mt-0"
                    rel="noreferrer"
                  >
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="mt-6 text-center">
        <a
          href={moocs.moreLink}
          target="_blank"
          className="inline-block text-base text-[#146321] hover:text-[#146321] underline font-medium transition duration-300"
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
  <section id="blog-section" className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-[#146321] border-b-2 border-[#146321]/30 pb-3 mb-6">
      Recent Blog Posts
    </h2>
    <ul className="space-y-4">
      {blogPosts.map((post, index) => (
        <li
          key={index}
          className="p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <a
            href={post.link}
            target="_blank"
            className="text-lg md:text-xl text-[#146321] hover:underline"
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
  <div className="min-h-screen flex flex-col bg-gray-50 text-[#146321] font-sans">
    <div className="container mx-auto p-6 max-w-screen-lg flex-grow">
      <ProfileHeader profile={profileData} />
      <EducationSection education={educationData} />
      <SkillsSection skills={skillsData} />
      <MOOCsSection moocs={moocsData} />
      <BlogSection blogPosts={blogPostsData} />
    </div>
  </div>
);

export default App;
